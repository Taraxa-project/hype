import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetByDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creatorAddress: string;
}
