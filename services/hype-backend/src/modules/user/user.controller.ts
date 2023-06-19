import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WalletGuard } from '../guards/wallet.guard';
import { UserDTO } from './dto';
import { GetByDTO } from './dto/get-by.dto';
import { HypeUser } from '../../entities/user.entity';
import { UsersService } from './user.service';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly service: UsersService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [HypeUser],
    description: 'Returns user by address',
  })
  @Get()
  @ApiBearerAuth('authorization')
  @UseGuards(WalletGuard)
  public getUserBy(
    @Query(ValidationPipe) filterDto: GetByDTO,
  ): Promise<HypeUser> {
    return this.service.getUserByAddress(filterDto);
  }

  @Post()
  @ApiBearerAuth('authorization')
  @UseGuards(WalletGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDTO,
    description: 'Returns a new created or an updated user',
  })
  public async createOrUpdateUser(@Body() userDTO: UserDTO): Promise<HypeUser> {
    return await this.service.updateAccount(userDTO);
  }
}
