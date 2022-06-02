import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { GetFilterDto, PoolDTO } from './dto';
import { HypePool } from './pool.entity';
import { PoolsService } from './pools.service';

@Controller()
export class PoolsController {
  constructor(private readonly poolsService: PoolsService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: [PoolDTO],
    description: 'Returns all hype pools',
  })
  @Get()
  getAllPools(@Query(ValidationPipe) filterDto: GetFilterDto): Promise<HypePool[]> {
    return this.poolsService.findAll(filterDto);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoolDTO,
    description: `Returns a hype pool`,
  })
  public async get(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PoolDTO | null> {
    return await this.poolsService.findById(id);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: PoolDTO,
    description: 'Returns a new created pool',
  })
  public async register(@Body() poolToCreate: PoolDTO): Promise<PoolDTO> {
    return await this.poolsService.create(poolToCreate);
  }
}
