import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PoolStatsDto {
  @ApiProperty()
  @IsString()
  tokensAwarded: string;

  @ApiProperty()
  @IsString()
  tokensClaimed: string;

  @ApiProperty()
  @IsString()
  participants: string;

  @ApiProperty()
  @IsString()
  impressions: string;
}
