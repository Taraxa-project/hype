import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RewardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  targetAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rewardAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString() //hex number
  value: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  poolID: number;
}
