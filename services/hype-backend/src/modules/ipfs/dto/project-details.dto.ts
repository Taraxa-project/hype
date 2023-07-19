import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjectDetailsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  projectDescription: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUri: string;
}
