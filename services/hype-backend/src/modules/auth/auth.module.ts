import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { auth } from '@taraxa-hype/config';

@Module({
  imports: [
    ConfigModule.forFeature(auth),
    HttpModule,
    CqrsModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
