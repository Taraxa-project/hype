import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class WalletGuard {
  constructor(private authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | UnauthorizedException> {
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
    } else if (responseStatus === HttpStatus.OK) {
      return true;
    }
    return false;
  }
}
