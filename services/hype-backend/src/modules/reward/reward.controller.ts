import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';
import { WalletGuard } from '../guards';
import { RewardDto } from './reward.dto';
import { ClaimResult, RewardService } from './reward.service';
import { RewardStateDto } from './rewardState.dto';
import { ClaimDto } from './claim.dto';
import { HypeClaim } from '../../entities';
dotenv.config();

@ApiTags('rewards')
@Controller('rewards')
export class RewardController {
  constructor(
    private readonly rewardService: RewardService,
    private httpService: HttpService,
  ) {}

  @Get()
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RewardDto],
    description: 'Returns all rewards',
  })
  async getAllRewards() {
    return await this.rewardService.getAllRewards();
  }

  @Get(':address')
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RewardDto],
    description: 'Returns rewards and claims based on address',
  })
  async getAllRewardsForAddress(
    @Param('address') address: string,
  ): Promise<RewardStateDto> {
    return await this.rewardService.getRewardSummaryForAddress(address);
  }

  @Post('claim')
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({ description: 'Claim details' })
  @ApiNotFoundResponse({ description: 'Claim not found' })
  public async claimed(@Body() claim: ClaimDto): Promise<HypeClaim> {
    return await this.rewardService.claim(claim);
  }

  @Patch(':address')
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({ description: 'Claim details' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @ApiBadRequestResponse({ description: 'No rewards to claim' })
  public async claimRewards(
    @Param('address') address: string,
    @Query('poolId') poolId: string,
  ): Promise<ClaimResult> {
    return await this.rewardService.releaseRewardHash(address, poolId);
  }
}
