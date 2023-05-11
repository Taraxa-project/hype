import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImpressionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  message_impressions: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pool_id: string;
}
