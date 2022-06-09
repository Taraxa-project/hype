import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IPool } from '../../../models';

export class PoolDTO implements IPool {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pool: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  poolToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bonus: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bonusToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  minReward: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rewardToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endDate: Date;
}
