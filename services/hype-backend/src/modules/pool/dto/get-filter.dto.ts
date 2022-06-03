import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { OrderDirection, PoolOrderByEnum } from '../../../utils';

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

  @IsOptional()
  @ApiPropertyOptional({ description: 'Order by parameter' })
  orderBy: PoolOrderByEnum;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Order direction' })
  order: OrderDirection;
}
