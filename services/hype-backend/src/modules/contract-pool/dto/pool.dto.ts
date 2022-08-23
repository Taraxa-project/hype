import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEthereumAddress,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface IContractPool {
  id?: number;
  projectName: string;
  title: string;
  description: string;
  uri: string;
  token: string;
  cap: number;
  minReward: number;
  endDate: Date;
  creator: string;
  active: boolean;
}

export class ContractPoolDTO implements Omit<IContractPool, 'active' | 'uri'> {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress()
  creator: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEthereumAddress()
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cap: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  minReward: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  endDate: Date;
}
