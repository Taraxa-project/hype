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
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WalletGuard } from '../auth/wallet.guard';
import { UserDTO } from './dto';
import { GetByDTO } from './dto/get-by.dto';
import { HypeUser } from './user.entity';
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
  @UseGuards(WalletGuard)
  public getUserBy(
    @Query(ValidationPipe) filterDto: GetByDTO,
  ): Promise<HypeUser> {
    return this.service.getUserBy(filterDto);
  }

  @Post()
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
