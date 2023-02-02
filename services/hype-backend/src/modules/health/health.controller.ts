import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([]);
  }
}
