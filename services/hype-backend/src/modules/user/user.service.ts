import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto';
import { HypeUser } from '../../entities/user.entity';
import { HypeReward } from '../reward';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(HypeUser)
    private repository: Repository<HypeUser>,
    @InjectRepository(HypeReward)
    private readonly rewardRepository: Repository<HypeReward>,
  ) {}

  async getUserByAddress(address: string): Promise<HypeUser> {
    return await this.repository
      .createQueryBuilder('hype_user')
      .where('LOWER(hype_user.address) LIKE LOWER(:address)', {
        address: address,
      })
      .getOne();
  }

  async updateAccount(userDTO: UserDTO): Promise<HypeUser> {
    const publicAddress = userDTO.address;
    const user = await this.getUserByAddress(publicAddress);
    if (!user) {
      const existingUser = await this.repository.findOne({
        where: {
          telegramId: userDTO.telegramId,
        },
      });
      if (existingUser) {
        throw new ConflictException(
          'A user with the same telegramId already exists.',
        );
      }

      return await this.createNewUser(userDTO);
    }
    await this.updateExistingUser(user, userDTO);

    if (userDTO.telegramId) {
      await this.updateRewardsRewardee(userDTO.address, userDTO.telegramId);
    }

    return await this.getUserByAddress(publicAddress);
  }

  private async createNewUser(userDTO: UserDTO): Promise<HypeUser> {
    const newUser = new HypeUser();
    newUser.address = userDTO.address;
    newUser.username = userDTO.username;
    newUser.auth_date = userDTO.auth_date;
    newUser.telegramId = userDTO.telegramId;
    return await this.repository.save(newUser);
  }

  private async updateExistingUser(
    user: HypeUser,
    userDTO: UserDTO,
  ): Promise<void> {
    await this.repository.update(user.id, {
      username: userDTO.username,
      auth_date: userDTO.auth_date,
      telegramId: userDTO.telegramId,
    });
  }

  private async updateRewardsRewardee(
    address: string,
    telegramId: string,
  ): Promise<void> {
    const rewards = await this.rewardRepository.findBy({ telegramId });

    await Promise.all(
      rewards.map(async (reward: HypeReward) => {
        await this.rewardRepository.update(reward.id, {
          rewardee: address,
        });
      }),
    );
  }
}
