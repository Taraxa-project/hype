import { Repository } from 'typeorm';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../entities/group.entity';
import { GetFilterDto } from './dto/get-filter.dto';
import { ethereum } from '@taraxa-hype/config';
import { ConfigType } from '@nestjs/config';
import ABIs from '../../abi';
import { IpfsService } from '../ipfs';
import { DateTime } from 'luxon';
import { Cron } from '@nestjs/schedule';

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

const DAYS_AGO_FILTER = 55; // Should be 14 (two weeks)

@Injectable()
export class GroupService {
  private logger = new Logger('GroupService');
  private readonly provider: ethers.providers.Provider;
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
    const { abi } = ABIs.contracts.GroupManagerFacet;
    const contractAddress = ethereumConfig.echoContract;
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  @Cron('0 0 * * SUN')
  async cleanupOldGroups() {
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
    console.log('collectDataForIngesters is being called');
    console.log(await this.provider.getNetwork());
    // const pastEvents = await this.contract.queryFilter('IpfsHashAdded');
    // console.log(
    //   '🚀 ~ file: group.service.ts:46 ~ GroupService ~ collectDataForIngesters ~ pastEvents:',
    //   pastEvents[pastEvents.length - 1],
    // );

    this.contract.on('error', (error) => {
      console.log('Error:', error);
    });

    const filter = this.contract.filters.IpfsHashAdded();
    this.provider.on(filter, (log) => {
      // Handle the log here
      console.log('SOME EVENT DATA HERE: ', log);
    });
    let chatsHash: string;
    let messagesHash: string;
    this.contract.on(
      'IpfsHashAdded',
      (
        ingesterAddress,
        usersIpfsHash,
        chatsIpfsHash,
        messagesIpfsHash,
        event,
      ) => {
        // Handle the event here
        console.log(
          'HERE IS THE EVENT:',
          ingesterAddress,
          usersIpfsHash,
          chatsIpfsHash,
          messagesIpfsHash,
          event,
        );
        chatsHash = chatsIpfsHash;
        messagesHash = messagesIpfsHash;
      },
    );

    const chatsIpfsHash = 'QmdXARE47ddfrj2amfaCZfzM1L7xhSDtgXcertjXkToki8';
    const messagesIpfsHash = 'QmRVSfNesgCszbJSvgheWhqUnjxceReANTnpDWuT9Z4RkZ';

    // const chatsIpfsHash = 'QmVvStdwsgxfsYtFupRK6bH4pXToee5QwgAZM1TDqLmLpw';
    // const messagesIpfsHash = 'QmY7SwZv5euVNirPQh4GmvywiH5C1eW1KCXiq1Jw8AxmXG';

    // await this.readIngexterData(chatsIpfsHash, messagesIpfsHash);
    if (chatsHash && messagesHash) {
      await this.readIngexterData(chatsHash, messagesHash);
    }
  }

  private async readIngexterData(
    chatsIpfsHash: string,
    messagesIpfsHash: string,
  ): Promise<void> {
    const messagesFile = await this.ipfsService.getIpfsFile(messagesIpfsHash);
    const chatFile = await this.ipfsService.getIpfsFile(chatsIpfsHash);
    console.log('chatFile: ', chatFile);
    const messageGroups = await this.downloadMessages(messagesFile);
    if (chatFile && messageGroups?.length > 0) {
      const chats = await this.getChatInfo(messageGroups, chatFile);
      console.log('Chats: ', chats);
      await this.saveChatInfo(chats);
    }
    // console.log(
    //   'HERE: ',
    //   await this.ipfsService.getIpfsFile('QmYyvJJHrdrRw7QLrHZdKfUKZU96c8fqU2FsW6TLJ5Xay5'),
    // );
  }

  private async downloadMessages(indexFile: string): Promise<MessageGroup[]> {
    const lines = indexFile
      .trim()
      .split('\n')
      .filter((line) => line.trim());

    const messages = lines.slice(1).map((line) => JSON.parse(line));

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - DAYS_AGO_FILTER);
    console.log(
      '🚀 ~ file: group.service.ts:137 ~ GroupService ~ downloadMessages ~ twoWeeksAgo:',
      twoWeeksAgo,
    );

    const messageGroups: MessageGroup[] = [];

    for (const message of messages) {
      const createdAt = new Date(message[2]);
      console.log(
        '🚀 ~ file: group.service.ts:157 ~ GroupService ~ createdAt:',
        createdAt,
      );

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

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - DAYS_AGO_FILTER);

    for (const { hash, createdAt } of chatDetails) {
      if (createdAt >= twoWeeksAgo) {
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
      // const weekStart = DateTime.fromJSDate(chatInfo.createdAt)
      //   .startOf('week')
      //   .toJSDate();

      const existingGroup = await this.groupRepository.findOne({
        where: {
          groupId: chatInfo.groupId,
          weekStart: weekStart,
        },
      });

      if (existingGroup) {
        existingGroup.totalMessages += chatInfo.totalMessages;
        existingGroup.memberCount = chatInfo.memberCount;
        existingGroup.groupTitle = chatInfo.title;
        existingGroup.groupUsername = chatInfo.groupUsername;
        existingGroup.totalMessages = chatInfo.totalMessages;
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

  public async findAll(filterDto: GetFilterDto): Promise<GroupPaginate> {
    const [groups, total] = await this.getByFilters(filterDto);
    return {
      data: groups || [],
      total,
    };
  }

  private async getByFilters(
    filterDto: GetFilterDto,
  ): Promise<[Group[], number]> {
    const { search, take, skip } = filterDto;
    const limit = take || 0;
    const offset = skip || 0;

    const query = this.groupRepository
      .createQueryBuilder('group')
      .select([
        'group.id',
        'group.groupUsername',
        'group.groupId',
        'group.groupTitle',
        'group.memberCount',
        'group.totalMessages',
        'group.weekStart',
        'group.createdAt',
        'group.updatedAt',
      ]);

    if (search) {
      query.where(
        'group.groupUsername ILIKE :search or group.groupTitle ILIKE :search',
        { search: `%${search}%` },
      );
    }

    try {
      const results = await query
        .skip(offset)
        .take(limit)
        .orderBy('group.weekStart', 'DESC')
        .addOrderBy('group.totalMessages', 'DESC')
        .getManyAndCount();
      return results;
    } catch (error) {
      this.logger.error(
        `Failed to get groups, DTO: ${JSON.stringify(filterDto)}`,
        error,
      );
      throw new InternalServerErrorException('Internal server exception');
    }
  }
}
