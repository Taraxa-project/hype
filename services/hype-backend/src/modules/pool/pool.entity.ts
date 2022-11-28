import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  OneToMany,
} from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { IPool } from '../../models';
import { HypeReward } from '../reward/reward.entity';

export const tableName = 'hype_pool';

@Entity(tableName)
export class HypePool extends BaseEntity implements IPool {
  constructor(pool?: Partial<HypePool>) {
    super();
    Object.assign(this, pool);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  projectName!: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Column({ type: 'text', nullable: false })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  pool!: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  creatorAddress!: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  rewardsAddress!: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  minReward: number;

  @Column({ type: Date, nullable: false })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Column({ type: Date, nullable: false })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsNumber()
  tokenId: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @OneToMany(() => HypeReward, (reward) => reward.pool, {
    cascade: true,
  })
  rewards: HypeReward[];
}
