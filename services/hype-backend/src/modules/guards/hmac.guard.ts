import * as crypto from 'crypto';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HMACGuard implements CanActivate {
  private secretKey: string;

  constructor(private readonly config: ConfigService) {
    this.secretKey = this.config.get<string>('auth.gsSecret');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const hmac = crypto.createHmac('sha256', this.secretKey);
    hmac.update(req.rawBody);
    const calculatedDigest = hmac.digest('hex');

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const [scheme, digest] = authHeader.split(' ');

    if (scheme !== 'HMAC' || !digest) {
      throw new UnauthorizedException();
    }

    if (calculatedDigest !== digest) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
