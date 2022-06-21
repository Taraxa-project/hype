import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IPool } from '../../../models';

export class PoolDTO implements IPool {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectName: string;

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
  @IsString()
  creatorAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rewardsAddress: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pool: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  minReward: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endDate: Date;
}
