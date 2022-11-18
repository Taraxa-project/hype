import {
  Body,
  Controller,
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
import { RewardDto } from './reward.dto';
import { HypeReward } from './reward.entity';
import { RewardService } from './reward.service';

@ApiTags('rewards')
@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

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
  public async claimRewards(@Param('address') address: string) {
    this.rewardService.releaseRewardHash(address);
  }
}
