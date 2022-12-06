import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BigNumber } from 'ethers';
import { RewardDto } from './reward.dto';
import { HypeReward } from './reward.entity';
import { RewardService } from './reward.service';
import { RewardStateDto } from './rewardState.dto';

@ApiTags('rewards')
@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RewardDto],
    description: 'Returns a newly inserted pool reward',
  })
  async getAllRewards() {
    return await this.rewardService.getAllRewards();
  }

  @Get(':address')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RewardDto],
    description: 'Returns a newly inserted pool reward',
  })
  async getAllRewardsForAddress(
    @Param('address') address: string,
  ): Promise<RewardStateDto> {
    return await this.rewardService.getRewardSummaryForAddress(address);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: RewardDto,
    description: 'Returns a newly inserted pool reward',
  })
  @ApiUnauthorizedResponse({ description: 'You need a valid token' })
  @ApiNotFoundResponse({ description: 'Claim not found' })
  public async accrueReward(
    @Body() rewardToAccrue: RewardDto,
  ): Promise<HypeReward> {
    try {
      return await this.rewardService.accrueRewards(rewardToAccrue);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong. Please try again!',
      );
    }
  }

  @Patch(':address')
  @ApiCreatedResponse({ description: 'Claim details' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @ApiBadRequestResponse({ description: 'No rewards to claim' })
  public async claimRewards(
    @Param('address') address: string,
  ): Promise<{ nonce: number; hash: string; claimedAmount: BigNumber }> {
    return await this.rewardService.releaseRewardHash(address);
  }
}
