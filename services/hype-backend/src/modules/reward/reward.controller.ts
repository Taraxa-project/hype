import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
  public async accrueReward(
    @Body() rewardToAccrue: RewardDto,
  ): Promise<HypeReward> {
    return await this.rewardService.accrueRewards(rewardToAccrue);
  }
}
