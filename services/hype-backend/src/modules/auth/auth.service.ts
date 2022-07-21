import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private walletEndpoint: string;

  constructor(private httpService: HttpService, private config: ConfigService) {
    this.walletEndpoint = this.config.get<string>('auth.walletEndpoint');
  }

  getMe(authorization: string): Observable<any> {
    return this.httpService.get(`${this.walletEndpoint}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization,
      },
    });
  }
}
