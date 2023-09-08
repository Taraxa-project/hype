import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
import * as dotenv from 'dotenv';
import { ClaimResult, RewardService } from './reward.service';
import { RewardDto, RewardStateDto, ClaimDto } from './dto';
import { HypeClaim } from '../../entities';
import { AuthGuard } from '@nestjs/passport';
import { GetAddress } from '../auth/get-address.decorator';
dotenv.config();

@ApiTags('rewards')
@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RewardDto],
    description: 'Returns all rewards',
  })
  async getAllRewards() {
    return await this.rewardService.getAllRewards();
  }

  @Get('address')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RewardDto],
    description: 'Returns rewards and claims based on address',
  })
  async getAllRewardsForAddress(
    @GetAddress() address: string,
  ): Promise<RewardStateDto> {
    return await this.rewardService.getRewardSummaryForAddress(address);
  }

  @Post('claim')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({ description: 'Claim details' })
  @ApiNotFoundResponse({ description: 'Claim not found' })
  public async claimed(
    @GetAddress() address: string,
    @Body() claim: ClaimDto,
  ): Promise<HypeClaim> {
    return await this.rewardService.claim(address, claim);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({ description: 'Claim details' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @ApiBadRequestResponse({ description: 'No rewards to claim' })
  public async claimRewards(
    @GetAddress() address: string,
    @Query('poolId') poolId: string,
  ): Promise<ClaimResult> {
    return await this.rewardService.releaseRewardHash(address, poolId);
  }
}
