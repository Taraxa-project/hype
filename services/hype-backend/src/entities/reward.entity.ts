import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';
import { IReward } from '../models';
import { HypeClaim } from './claim.entity';

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

  @Column({ nullable: true })
  @IsString()
  telegramUsername: string;

  @Column({ nullable: true })
  @IsString()
  impressions: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  tokenAddress: string;

  @Column({ nullable: false, default: false })
  @IsNotEmpty()
  @IsBoolean()
  claimed: boolean;

  @Column({
    name: 'date_from',
    type: 'date',
    nullable: true,
  })
  @IsNotEmpty()
  @IsDate()
  dateFrom: Date;

  @Column({
    name: 'date_to',
    type: 'date',
    nullable: true,
  })
  @IsNotEmpty()
  @IsDate()
  dateTo: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => HypeClaim, (claim) => claim.rewards)
  claim: HypeClaim;
}
