import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEthereumAddress,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IHypeUser } from '../../../models';

export class UserDTO implements IHypeUser {
  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  auth_date: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  telegramId: number;
}
