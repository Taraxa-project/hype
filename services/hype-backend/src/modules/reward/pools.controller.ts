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
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { WalletGuard, HMACGuard } from '../guards';
import { ImpressionDto, RewardDto } from './dto';
import { RewardService } from './reward.service';
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
    description: 'Returns joined pools for a givven address',
  })
  async getJoined(@Param('address') address: string): Promise<IPool[]> {
    return this.rewardService.getJoinedPools(address);
  }

  @Post('impressions')
  @UseGuards(HMACGuard)
  @ApiBearerAuth('authorization')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns 200 OK',
  })
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
