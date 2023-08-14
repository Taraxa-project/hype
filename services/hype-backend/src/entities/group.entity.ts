import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

@Entity('group')
export class Group extends BaseEntity {
  constructor(group?: Partial<Group>) {
    super();
    Object.assign(this, group);
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'group_username' })
  @IsNotEmpty()
  @IsString()
  groupUsername: string;

  @Column({ name: 'group_id' })
  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @Column({ name: 'group_title' })
  @IsNotEmpty()
  @IsString()
  groupTitle: string;

  @Column({ name: 'member_count', default: 0 })
  @IsNotEmpty()
  @IsNumber()
  memberCount: number;

  @Column({ name: 'total_messages', default: 0 })
  @IsNotEmpty()
  @IsNumber()
  totalMessages: number;

  @Column({
    name: 'week_start',
    type: 'date', // Storing the start date of the week
    default: new Date(),
  })
  @IsNotEmpty()
  @IsDate()
  weekStart: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
