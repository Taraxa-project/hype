import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectDetailsDTO } from './dto';
import { IpfsAddResult, IpfsResult, IpfsService } from './ipfs.service';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';

@ApiTags('ipfs')
@Controller('/ipfs')
export class IpfsController {
  constructor(private readonly service: IpfsService) {}

  @Post('upload-details')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProjectDetailsDTO,
    description: 'Returns an ipfs url',
  })
  public async create(
    @Body() details: ProjectDetailsDTO,
  ): Promise<IpfsResult | IpfsAddResult> {
    return await this.service.uploadDetailsToIpfs(details);
  }

  @Post('upload-image')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns an ipfs url for the uploaded image',
  })
  public async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IpfsResult | IpfsAddResult> {
    return await this.service.uploadImageToIpfs(file.originalname, file.buffer);
  }
}
