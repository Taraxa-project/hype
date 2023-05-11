import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';

dotenv.config();

@Injectable()
export class HmacMiddleware implements NestMiddleware {
  private secretKey: string;

  constructor(private readonly config: ConfigService) {
    this.secretKey = this.config.get<string>('auth.gsSecret');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const hmac = crypto.createHmac('sha256', this.secretKey);
    hmac.update(JSON.stringify(req.body)); // Hash the request body with the secret key
    const calculatedDigest = hmac.digest('hex'); // Generate the HMAC digest

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Unauthorized');
    }

    const [scheme, digest] = authHeader.split(' ');

    if (scheme !== 'HMAC' || !digest) {
      return res.status(401).send('Unauthorized');
    }

    if (calculatedDigest !== digest) {
      return res.status(401).send('Unauthorized');
    }

    next();
  }
}
