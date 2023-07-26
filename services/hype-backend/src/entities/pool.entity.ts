import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { IPool, PoolStatus } from '../models';

@Entity('hype_pool')
export class HypePool
  extends BaseEntity
  implements Pick<IPool, 'id' | 'status'>
{
  constructor(pool?: Pick<IPool, 'id' | 'status'>) {
    super();
    Object.assign(this, pool);
  }

  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  id!: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  @IsEnum(PoolStatus)
  status: PoolStatus;
}
