import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEthereumAddress,
  IsOptional,
} from 'class-validator';
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
  @IsEthereumAddress()
  creatorAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress()
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

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  tokenId?: number;
}
