import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
import { IReward } from '../../models';

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

  @Column({ nullable: false, default: false })
  @IsNotEmpty()
  @IsBoolean()
  claimed: boolean;
}
