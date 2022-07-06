import { IsEthereumAddress, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetByDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
}
