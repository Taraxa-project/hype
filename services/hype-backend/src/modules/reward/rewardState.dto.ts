import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { BigNumber } from 'ethers';
import { HypeClaim } from '../../entities/claim.entity';

export class RewardStateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  totalUnclaimed: {
    unclaimed: BigNumber;
    poolId: number;
    tokenAddress: string;
  }[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  claims: HypeClaim[];
}
