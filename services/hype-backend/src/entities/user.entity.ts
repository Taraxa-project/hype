import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { IHypeUser } from '../models';

@Entity('hype-user')
export class HypeUser extends BaseEntity implements IHypeUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, unique: true })
  @IsString()
  address!: string;

  @Column({ nullable: true, unique: true })
  @IsString()
  username: string;

  @Column({ nullable: true, unique: true })
  @IsNumber()
  telegramId: number;

  @Column({ nullable: true, unique: true })
  @IsNumber()
  telegramDetails: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsNumber()
  auth_date: number;

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
