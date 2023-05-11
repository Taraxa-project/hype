import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { IGroup } from '../models/IGroup';

@Entity('group')
export class Group extends BaseEntity implements IGroup {
  constructor(group?: Partial<Group>) {
    super();
    Object.assign(this, group);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'group_username', nullable: false })
  @IsNotEmpty()
  @IsString()
  groupUsername: string;

  @Column({ name: 'group_id', nullable: true })
  @IsNotEmpty()
  @IsNumber()
  groupId?: number;

  @Column({ name: 'group_title', nullable: true })
  @IsString()
  groupTitle?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  createdAt?: Date;
}
