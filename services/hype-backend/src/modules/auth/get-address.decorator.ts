import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.address;
  },
);
