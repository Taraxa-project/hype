import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImpressionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  message_impressions: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pool_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  from: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  telegram_group: string;
}
