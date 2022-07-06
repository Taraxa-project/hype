import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IHypeUser } from '../../models';

export const tableName = 'hype-user';

@Entity(tableName)
export class HypeUser extends BaseEntity implements IHypeUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  @IsString()
  address!: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  username: string;

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
