import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
  CanActivate,
} from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class WalletGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const responseStatus = await lastValueFrom(
      this.authService.getMe(authorization).pipe(
        map((resp: any) => {
          return resp.status;
        }),
        catchError(() => {
          throw new UnauthorizedException();
        }),
      ),
    );

    if (responseStatus === HttpStatus.UNAUTHORIZED) {
      throw new UnauthorizedException();
    }

    return responseStatus === HttpStatus.OK;
  }
}
