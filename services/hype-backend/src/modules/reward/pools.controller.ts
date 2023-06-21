import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UseGuards,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { WalletGuard, HMACGuard } from '../guards';
import {
  ImpressionDto,
  PoolStatsDto,
  RewardDto,
  TopTelegramAccountDto,
} from './dto';
import { PoolStatsResult, RewardService } from './reward.service';
import { IPool } from '../../models';
dotenv.config();

@ApiTags('pools')
@Controller('pools')
export class PoolsController {
  constructor(private readonly rewardService: RewardService) {}

  @Get('joined/:address')
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RewardDto],
    description: 'Returns joined pools for a given address',
  })
  async getJoined(@Param('address') address: string): Promise<IPool[]> {
    return this.rewardService.getJoinedPools(address);
  }

  @Get('stats/:poolId')
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoolStatsDto,
    description: 'Returns pool stats for a given address',
  })
  async getStats(@Param('poolId') poolId: string): Promise<PoolStatsResult> {
    return this.rewardService.getPoolStats(poolId);
  }

  @Get('leaderboard/:poolId')
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    type: [TopTelegramAccountDto],
    description: 'Returns pool stats for a given address',
  })
  async getLeaderboard(
    @Param('poolId') poolId: string,
  ): Promise<TopTelegramAccountDto[]> {
    return this.rewardService.getLeaderboard(poolId);
  }

  @Post('impressions')
  @UseGuards(HMACGuard)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns 200 OK',
  })
  @ApiBody({ type: [ImpressionDto] })
  @ApiNotFoundResponse({ description: 'Endpoint not found' })
  @ApiUnauthorizedResponse({ description: 'You need a valid key' })
  public async saveImpressions(
    @Body() impressions: ImpressionDto[],
  ): Promise<void> {
    try {
      return await this.rewardService.saveImpressions(impressions);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again!',
      );
    }
  }
}
