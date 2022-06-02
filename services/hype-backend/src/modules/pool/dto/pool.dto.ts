import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IPool } from '../../../models';

export class PoolDTO implements IPool {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  accountAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  minReward: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  poolCap: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  poolEnds: Date;
}
