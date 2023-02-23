import {
  Body,
  Controller,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import * as crypto from 'crypto';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import * as dotenv from 'dotenv';
import { WalletGuard, HmacMiddleware } from '../guards';
import { ImpressionDto } from './impression.dto';
import { RewardDto } from './reward.dto';
import { HypeReward } from '../../entities/reward.entity';
import { ClaimResult, RewardService } from './reward.service';
import { RewardStateDto } from './rewardState.dto';

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
    description: 'Returns a newly inserted pool reward',
  })
  async getAllRewardsForAddress(
    @Param('address') address: string,
  ): Promise<RewardStateDto> {
    return await this.rewardService.getRewardSummaryForAddress(address);
  }

  // TODO - Remove this
  @Post()
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
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

  @Post('impressions')
  @UseGuards(HmacMiddleware)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns 200 OK',
  })
  @ApiUnauthorizedResponse({ description: 'You need a valid key' })
  public async saveImpressions(
    @Body() impressions: ImpressionDto[],
  ): Promise<void> {
    try {
      return await this.rewardService.saveImpressions(impressions);
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong. Please try again!',
      );
    }
  }

  @Patch(':address')
  @UseGuards(WalletGuard)
  @ApiBearerAuth('authorization')
  @ApiCreatedResponse({ description: 'Claim details' })
  @ApiNotFoundResponse({ description: 'Address not found' })
  @ApiBadRequestResponse({ description: 'No rewards to claim' })
  public async claimRewards(
    @Param('address') address: string,
    @Query('poolId') poolId: number,
  ): Promise<ClaimResult> {
    return await this.rewardService.releaseRewardHash(address, poolId);
  }

  // TODO - Remove this
  // THESE ARE FOR TESTING PURPOSES
  /*
    HMAC Authentication: HMAC (Hash-based Message Authentication Code) is a method of message authentication that uses a secret key to generate a message authentication code. 
    You could use HMAC to authenticate clients accessing your API.
    To implement this, you would generate a secret key and store it in your application's environment variables. 
    When a client makes a request to your API, they include a message authentication code (MAC) in the Authorization header of the request.
    The MAC is generated by hashing the request body or a portion of the request headers with the secret key.
    Your API then calculates the MAC using the same hashing algorithm and secret key, and verifies that it matches the MAC provided by the client.
    If the MACs match, your API grants access to the requested resource.
  */
  @Post('encrypt')
  async sendMessage() {
    const secretKey = process.env.GS_SECRET; // Get the secret key from environment variables
    // console.log('secret key: ', crypto.randomBytes(16).toString('hex'));
    console.log('Secret key:', secretKey);
    const message = { message: 'Hello decrypt! Are you working fine?' }; // The message to send

    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(JSON.stringify(message)); // Hash the message with the secret key
    const digest = hmac.digest('hex'); // Generate the HMAC digest

    const headers = {
      Authorization: `HMAC ${digest}`,
    };

    return firstValueFrom(
      this.httpService
        .post('http://localhost:3060/rewards/decrypt', message, { headers })
        .pipe(
          map((res: AxiosResponse) => {
            console.log(res.data);
            return res.data;
          }),
          catchError((error) => {
            console.log(error);
            throw new ForbiddenException('API not available');
          }),
        ),
    );
  }

  @Post('decrypt')
  @UseGuards(HmacMiddleware)
  receiveMessage(@Body() body: { message: string }) {
    return { received: body.message, response: 'Hello encrypt! Yes I am !!!' };
  }
}
