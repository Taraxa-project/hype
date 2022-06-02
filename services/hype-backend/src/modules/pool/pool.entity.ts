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
  name!: string;

  @Column({ type: 'text', nullable: false })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsString()
  accountAddress!: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  minReward: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  poolCap: number;

  @Column({ type: Date, nullable: false })
  @IsNotEmpty()
  @IsDate()
  poolEnds: Date;

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
