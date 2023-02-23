import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { BigNumber } from 'ethers';
import { HypeClaim } from '../../entities/claim.entity';

export interface TotalUnclaimed {
  unclaimed: BigNumber;
  poolId: number;
  tokenAddress: string | undefined;
}
export class RewardStateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  totalUnclaimed: TotalUnclaimed[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  claims: HypeClaim[];
}
