import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class HmacMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const secretKey = process.env.GS_SECRET; // Get the secret key from environment variables
    console.log('I AM INSIDE THE MIDDLEWARE');
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(JSON.stringify(req.body)); // Hash the request body with the secret key
    const calculatedDigest = hmac.digest('hex'); // Generate the HMAC digest

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Unauthorized');
    }

    const [scheme, digest] = authHeader.split(' ');

    console.log('scheme: ', scheme);
    console.log('digest: ', digest);
    console.log('calculatedDigest: ', calculatedDigest);
    if (scheme !== 'HMAC' || !digest) {
      return res.status(401).send('Unauthorized');
    }

    if (calculatedDigest !== digest) {
      return res.status(401).send('Unauthorized');
    }

    next();
  }
}
