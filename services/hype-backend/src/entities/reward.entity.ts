import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { IReward } from '../models';

@Entity('hype_reward')
export class HypeReward extends BaseEntity implements IReward {
  constructor(reward?: Partial<HypeReward>) {
    super();
    Object.assign(this, reward);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  poolId: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  amount: string;

  @Column({ nullable: true })
  @IsString()
  telegramId: string;

  @Column({ nullable: true })
  @IsString()
  rewardee: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  tokenAddress: string;

  @Column({ nullable: false, default: false })
  @IsNotEmpty()
  @IsBoolean()
  claimed: boolean;
}
