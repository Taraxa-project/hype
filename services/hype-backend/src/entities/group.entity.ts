import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
} from 'class-validator';

@Entity('group')
export class Group extends BaseEntity {
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
  @IsOptional()
  @IsNumber()
  groupId?: number;

  @Column({ name: 'group_title', nullable: true })
  @IsOptional()
  @IsString()
  groupTitle?: string;

  @Column({ name: 'member_count', nullable: true })
  @IsOptional()
  @IsNumber()
  memberCount?: number;

  @Column({ name: 'total_messages', nullable: true })
  @IsOptional()
  @IsNumber()
  totalMessages?: number;

  @Column({
    name: 'week_start',
    type: 'date', // Storing the start date of the week
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  weekStart?: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt?: Date;
}
