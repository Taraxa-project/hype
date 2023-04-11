import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import { BigNumber } from 'ethers';
import { IPool, IClaim } from '../../../models';

export interface TotalUnclaimed {
  unclaimed: BigNumber;
  poolId: string;
  pool: IPool;
  tokenAddress: string | undefined;
}

export interface PoolClaim extends IClaim {
  pool: IPool;
}

export class RewardStateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  totalUnclaimed: TotalUnclaimed[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  claims: PoolClaim[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  rewardsReceived: PoolClaim[];
}
