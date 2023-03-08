import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ClaimDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  rewardee: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  poolId: string;
}
