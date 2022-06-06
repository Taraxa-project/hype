import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { IPool } from '../../models';

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
  accountAddress!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  poolToken: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  bonus: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  bonusToken: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  minReward: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  rewardToken: string;

  @Column({ type: Date, nullable: false })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Column({ type: Date, nullable: false })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

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
}
