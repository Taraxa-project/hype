import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContractHypePool, PoolPaginate } from '../../models';
import { WalletGuard } from '../auth/wallet.guard';
import { GetFilterDto, PoolDTO } from './dto';
import { GetByDTO } from './dto/get-by.dto';
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

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [PoolDTO],
    description: 'Returns hype pool by address',
  })
  @Get('by')
  @UseGuards(WalletGuard)
  public getPoolsBy(
    @Query(ValidationPipe) filterDto: GetByDTO,
  ): Promise<HypePool[]> {
    return this.poolsService.findBy(filterDto);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoolDTO,
    description: `Returns a hype pool by id`,
  })
  public async getById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ContractHypePool | null> {
    return await this.poolsService.findById(id);
  }

  @Post()
  @UseGuards(WalletGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoolDTO,
    description: 'Returns a new created pool',
  })
  public async createPool(@Body() poolToCreate: PoolDTO): Promise<string> {
    return await this.poolsService.create(poolToCreate);
  }

  @Patch('/:id')
  @UseGuards(WalletGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoolDTO,
    description: 'Returns an updated pool',
  })
  @ApiNotFoundResponse({ description: `No pool found` })
  public async update(
    @Param('id') id: number,
    @Body() tokenId: number,
  ): Promise<PoolDTO> {
    return await this.poolsService.update(id, tokenId);
  }
}
