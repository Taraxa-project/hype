import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TopTelegramAccountDto {
  @ApiProperty()
  @IsNumber()
  rank: number;

  @ApiProperty()
  @IsString()
  telegramUsername: string;

  @ApiProperty()
  @IsNumber()
  totalImpressions: number;
}
