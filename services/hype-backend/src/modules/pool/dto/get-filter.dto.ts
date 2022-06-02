import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetFilterDto {
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Number of elements which should be taken',
  })
  take: number;

  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Number of elements which should be skipped',
  })
  skip: number;
}
