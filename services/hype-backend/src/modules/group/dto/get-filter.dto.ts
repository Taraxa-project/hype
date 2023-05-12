import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetFilterDto {
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Number of elements which should be taken',
  })
  take: number;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Number of elements which should be skipped',
  })
  skip: number;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Search string' })
  search: string;
}
