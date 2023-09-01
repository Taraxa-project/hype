import { Repository } from 'typeorm';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../entities/group.entity';
import { ethereum } from '@taraxa-hype/config';
import { ConfigType } from '@nestjs/config';
import { IpfsService } from '../ipfs';
import { DateTime } from 'luxon';
import { Cron } from '@nestjs/schedule';
import ABIs from '../../abi';

export interface GroupPaginate {
  data: any[];
  total: number;
}

interface MessageGroup {
  groupId: number;
  totalMessages: number;
}

interface ChatInfo {
  groupId: number;
  totalMessages: number;
  groupUsername: string;
  title: string;
  memberCount: number;
  createdAt: Date;
}

const DAYS_AGO_FILTER = 14;

@Injectable()
export class IngesterService implements OnModuleInit {
  private logger = new Logger('GroupService');
  private readonly provider: ethers.providers.JsonRpcProvider;
  private readonly contract: ethers.Contract;

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @Inject(ethereum.KEY)
    ethereumConfig: ConfigType<typeof ethereum>,
    private ipfsService: IpfsService,
  ) {
    this.provider = new ethers.providers.JsonRpcProvider(
      ethereumConfig.provider,
    );
    const abi = ABIs.contracts.DataGatheringFacet.abi;
    const contractAddress = ethereumConfig.echoContract;
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  onModuleInit() {
    this.collectDataForIngesters();
  }

  @Cron('0 0 * * SUN')
  async cleanupOldGroups() {
    this.logger.debug('Starting cleanup for old telegram groups worker...');
    try {
      const n = 2;
      const targetDate = DateTime.local()
        .startOf('week')
        .minus({ weeks: n })
        .toJSDate();

      const deleteResult = await this.groupRepository
        .createQueryBuilder()
        .delete()
        .from(Group)
        .where('weekStart < :targetDate', { targetDate })
        .execute();

      const deletedCount = deleteResult.affected || 0;

      this.logger.log(
        `Deleted ${deletedCount} groups older than ${n - 2} weeks.`,
      );
    } catch (error) {
      this.logger.error('Failed to delete old groups.', error);
      throw new InternalServerErrorException('Failed to delete old groups.');
    }
  }

  public async collectDataForIngesters(): Promise<void> {
    this.logger.debug(`Started ingester listening for IpfsHashAdded event`);
    // const pastEvents = await this.contract.queryFilter('IpfsHashAdded');
    this.contract.on(
      'IpfsHashAdded',
      async (
        ingesterAddress,
        usersIpfsHash,
        chatsIpfsHash,
        messagesIpfsHash,
        event,
      ) => {
        try {
          console.log(
            'Event received:',
            ingesterAddress,
            usersIpfsHash,
            chatsIpfsHash,
            messagesIpfsHash,
            event,
          );

          await this.readIngexterData(chatsIpfsHash, messagesIpfsHash);
          this.logger.log('Data Ingexter finished');
        } catch (err) {
          this.logger.error(`Something wrong occurred: ${err}`);
        }
      },
    );

    this.contract.on('error', (error) => {
      console.error('Echo Contract Error:', error);
    });

    // Use this for testing
    // const chatsIpfsHash = 'QmT2i2SdazcqjdqofFA8TBUSce4w8AHErtebVs8WH3hSeN';
    // const messagesIpfsHash = 'QmPAfdQSFX67j3ccXLFXNUH4Kg9K2hXmo5S7kaWGifMqTS';
    // await this.readIngexterData(chatsIpfsHash, messagesIpfsHash);
  }

  private async readIngexterData(
    chatsIpfsHash: string,
    messagesIpfsHash: string,
  ): Promise<void> {
    const messagesFile = await this.ipfsService.getIpfsFile(messagesIpfsHash);
    const chatFile = await this.ipfsService.getIpfsFile(chatsIpfsHash);
    const messageGroups = await this.downloadMessages(messagesFile);
    if (chatFile && messageGroups?.length > 0) {
      const chats = await this.getChatInfo(messageGroups, chatFile);
      await this.saveChatInfo(chats);
    }
  }

  private async downloadMessages(indexFile: string): Promise<MessageGroup[]> {
    const lines = indexFile
      .trim()
      .split('\n')
      .filter((line) => line.trim());

    const messages = lines.slice(1).map((line) => JSON.parse(line));

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - DAYS_AGO_FILTER);

    const messageGroups: MessageGroup[] = [];

    for (const message of messages) {
      const createdAt = new Date(message[2]);

      if (createdAt >= twoWeeksAgo) {
        const data = await this.ipfsService.getIpfsFile(message[1]);

        const downloadedLines = data.trim().split('\n').slice(1);
        for (const line of downloadedLines) {
          const chatId = JSON.parse(line)[0];
          let group = messageGroups.find((g) => g.groupId === chatId);

          if (!group) {
            group = { groupId: chatId, totalMessages: 0 };
            messageGroups.push(group);
          }
          group.totalMessages++;
        }
      }
    }

    return messageGroups;
  }

  private async getChatInfo(
    messageGroups: MessageGroup[],
    chatFile: string,
  ): Promise<ChatInfo[]> {
    const chatLines = chatFile.trim().split('\n').slice(1);
    const chatDetails = chatLines
      .map((line) => JSON.parse(line))
      .map((item) => ({
        hash: item[1],
        createdAt: new Date(item[2]),
      }));

    const chatInfos: ChatInfo[] = [];

    const { hash } = chatDetails[chatDetails.length - 1];
    const data = await this.ipfsService.getIpfsFile(hash);

    const downloadedLines = data.trim().split('\n').slice(1);
    for (const line of downloadedLines) {
      const chatData = JSON.parse(line);
      const groupId = chatData[1];
      const group = messageGroups.find((g) => g.groupId === groupId);
      if (group) {
        const chatInfo: ChatInfo = {
          groupId: groupId,
          totalMessages: group.totalMessages,
          groupUsername: chatData[0],
          title: chatData[2],
          memberCount: chatData[3],
          createdAt: new Date(chatData[8]),
        };
        chatInfos.push(chatInfo);
      }
    }

    return chatInfos;
  }

  private async saveChatInfo(chatInfos: ChatInfo[]): Promise<void> {
    if (!chatInfos || chatInfos.length === 0) {
      return;
    }
    const weekStart = DateTime.local()
      .startOf('week')
      .set({ weekday: 0 }) // Sunday
      .toJSDate();

    for (const chatInfo of chatInfos) {
      const existingGroup = await this.groupRepository.findOne({
        where: {
          groupId: chatInfo.groupId,
          weekStart: weekStart,
        },
      });

      if (existingGroup) {
        existingGroup.memberCount = chatInfo.memberCount;
        existingGroup.groupTitle = chatInfo.title;
        existingGroup.groupUsername = chatInfo.groupUsername;
        existingGroup.totalMessages = chatInfo.totalMessages;
        existingGroup.createdAt = chatInfo.createdAt;
        await this.groupRepository.save(existingGroup);
        this.logger.log(
          `Updated group with ID ${existingGroup.groupId} for week ${weekStart} `,
        );
      } else {
        const newGroup = new Group({
          groupId: chatInfo.groupId,
          groupUsername: chatInfo.groupUsername,
          groupTitle: chatInfo.title,
          memberCount: chatInfo.memberCount,
          totalMessages: chatInfo.totalMessages,
          createdAt: chatInfo.createdAt,
          weekStart: weekStart,
        });
        await this.groupRepository.save(newGroup);
        this.logger.log(
          `Created new group with ID ${chatInfo.groupId} for week ${weekStart} `,
        );
      }
    }
  }
}
