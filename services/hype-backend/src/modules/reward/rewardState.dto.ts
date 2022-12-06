import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { BigNumber } from 'ethers';
import { HypeReward } from './reward.entity';

export class RewardStateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  totalUnclaimeds: { unclaimed: BigNumber; token: string }[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  claimed: HypeReward[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  unclaimed: HypeReward[];
}
