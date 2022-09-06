import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WalletGuard } from '../auth/wallet.guard';
import { ContractPoolsService } from './contract-pool.service';
import { ContractPoolDTO } from './dto';

@ApiTags('contract-pools')
@Controller('/contract-pools')
export class ContractPoolsController {
  constructor(private readonly poolsService: ContractPoolsService) {}

  @Post()
  @UseGuards(WalletGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ContractPoolDTO,
    description: 'Returns a new created pool',
  })
  public async create(
    @Body() poolToCreate: ContractPoolDTO,
  ): Promise<ContractPoolDTO> {
    return await this.poolsService.create(poolToCreate);
  }
}
