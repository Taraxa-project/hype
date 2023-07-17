import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TopTelegramAccountDto {
  @ApiProperty()
  @IsNumber()
  rank: string;

  @ApiProperty()
  @IsString()
  telegramId: string;

  @ApiProperty()
  @IsString()
  telegramUsername: string;

  @ApiProperty()
  @IsNumber()
  totalImpressions: number;
}
