import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { PoolStatsResult } from '../reward.service';

export class PoolStatsDto implements PoolStatsResult {
  @ApiProperty()
  @IsNumber()
  tokensAwarded: number;

  @ApiProperty()
  @IsNumber()
  tokensClaimed: number;

  @ApiProperty()
  @IsNumber()
  participants: number;

  @ApiProperty()
  @IsNumber()
  impressions: number;
}
