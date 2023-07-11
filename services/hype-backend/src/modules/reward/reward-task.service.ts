import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RewardService } from './reward.service';
import { GraphQlService } from '../graphql';
import { IPool } from '../../models';
import { BlockchainService, ContractTypes, ProviderType } from '../blockchain';
import { ethereum } from '../../../config';
import { ConfigType } from '@nestjs/config';
import { BigNumber } from 'ethers';
import * as abi from 'ethereumjs-abi';
import * as ethUtil from 'ethereumjs-util';

interface ClaimArgs {
  receiver: string;
  poolId: string;
  amount: BigNumber;
  tokenAddress: string;
  nonce: number;
  hash: string;
}

@Injectable()
export class RewardTaskService implements OnModuleInit {
  private readonly logger = new Logger(RewardTaskService.name);

  constructor(
    @Inject(ethereum.KEY)
    private readonly ethereumConfig: ConfigType<typeof ethereum>,
    private rewardService: RewardService,
    private graphQlService: GraphQlService,
    private readonly blockchainService: BlockchainService,
  ) {}
  onModuleInit() {
    this.logger.debug(`Init ${RewardTaskService.name} cron`);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async calculateRewardsForLeaderboard() {
    this.logger.debug('Calculating rewards top user in Leaderboard...');
    // Get all current active pools (active = true, endDate > currentDate)
    const { hypePools } = await this.graphQlService.getActivePools();
    console.log('POOLS: ', hypePools);
    await Promise.all(
      hypePools.map(async (pool: IPool) => {
        // For each active get Leaderboard
        const leaderboard = await this.rewardService.getLeaderboard(pool.id);
        // console.log('leaderboard: ', leaderboard[0]);
        // Make sure the first position in leadeboard has rank 1
        if (leaderboard.length > 0 && leaderboard[0].rank === '1') {
          // console.log('leaderboard[0]: ', leaderboard[0]);
          // Get user from DB to use his address
          const user = await this.rewardService.getUserByTelegramId(
            leaderboard[0].telegramId.toString(),
          );
          if (!user) {
            throw new NotFoundException(
              `User with telegram id: ${leaderboard[0].telegramId.toString()} was not found`,
            );
          }
          const amount = 2000;
          const { nonce, hash } = await this.generateRewardHash(
            user.address,
            amount,
          );
          const args: ClaimArgs = {
            receiver: user.address,
            poolId: pool.id,
            amount: BigNumber.from(2000),
            tokenAddress: pool.tokenAddress,
            nonce,
            hash,
          };
          await this.generateReward(args);
          console.log('USER: ', user);
        }
      }),
    );
  }

  private async generateRewardHash(address: string, amount: number) {
    const provider = this.blockchainService.getProvider();
    const nonce = await provider.getTransactionCount(address);
    const encodedPayload = abi.soliditySHA3(
      ['address', 'uint', 'uint'],
      [address, amount.toString(), nonce],
    );
    const { v, r, s } = ethUtil.ecsign(
      encodedPayload,
      this.rewardService.privateKey,
    );
    const hash = ethUtil.toRpcSig(v, r, s);

    return {
      nonce,
      hash,
    };
  }

  private async generateReward(args: ClaimArgs) {
    const escrowContractInstance = this.blockchainService.getContractInstance(
      ContractTypes.ESCROW,
      this.ethereumConfig.escrowContractAddress,
      ProviderType.WALLET,
    );
    const overrideOptions = {
      gasLimit: 9999999,
    };
    try {
      const tx = await escrowContractInstance.claim(
        args.receiver,
        args.poolId,
        args.amount,
        args.tokenAddress,
        args.nonce,
        args.hash,
        overrideOptions,
      );
      console.log('createPoolTx: ', tx);
      const rc = await tx.wait();
      const event = rc.events.find((event: any) => event.event === 'Claimed');
      console.log('EVENT ARGS: ', event.args);
      const [receiver, amount, poolId] = event.args;
      this.logger.log(
        `Reward sent for receiver: ${receiver} with pool ID: ${poolId} and amount: ${amount.toString()} `,
      );
      return {
        receiver,
        amount,
        poolId,
      };
    } catch (error) {
      this.logger.error(`Something went wrong: ${error}`);
      throw new InternalServerErrorException(
        'Something went wrong when sending rewards',
      );
    }
  }
}
