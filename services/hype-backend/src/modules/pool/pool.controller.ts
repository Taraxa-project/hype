import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PoolPaginate } from '../../models';
import { GetAddress } from '../auth/get-address.decorator';
import { GetFilterDto, PoolDTO } from './dto';
import { HypePool } from './pool.entity';
import { PoolsService } from './pool.service';

@ApiTags('pools')
@Controller('/pools')
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [PoolDTO],
    description: 'Returns all hype pools',
  })
  @Get()
  public getAllPools(
    @Query(ValidationPipe) filterDto: GetFilterDto,
  ): Promise<PoolPaginate> {
    return this.poolsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoolDTO,
    description: `Returns a hype pool`,
  })
  public async getById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PoolDTO | null> {
    return await this.poolsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoolDTO,
    description: 'Returns a new created pool',
  })
  public async createPool(
    @Body() poolToCreate: PoolDTO,
    @GetAddress() address: string,
  ): Promise<PoolDTO> {
    return await this.poolsService.create(poolToCreate);
  }
}
