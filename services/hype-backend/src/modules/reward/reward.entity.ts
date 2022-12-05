import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { IPool, IReward } from '../../models';
import { HypePool } from '../pool/pool.entity';

export const tableName = 'hype_reward';

@Entity(tableName)
export class HypeReward extends BaseEntity implements IReward {
  constructor(reward?: Partial<HypeReward>) {
    super();
    Object.assign(this, reward);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsNumber()
  amount: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  rewardee: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  tokenAddress: string;

  @ManyToOne(() => HypePool, (pool) => pool.rewards)
  pool: IPool;
}
