import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WalletGuard } from '../auth/wallet.guard';
import { ProjectDetailsDTO } from './dto';
import { IpfsAddResult, IpfsResult, IpfsService } from './ipfs.service';

@ApiTags('ipfs')
@Controller('/ipfs')
export class IpfsController {
  constructor(private readonly service: IpfsService) {}

  @Post('upload')
  @UseGuards(WalletGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProjectDetailsDTO,
    description: 'Returns an ipfs url',
  })
  public async create(
    @Body() details: ProjectDetailsDTO,
  ): Promise<IpfsResult | IpfsAddResult> {
    return await this.service.uploadToIpfs(details);
  }
}
