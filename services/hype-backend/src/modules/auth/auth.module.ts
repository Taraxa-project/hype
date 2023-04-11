import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { auth } from '@taraxa-hype/config';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule.forFeature(auth), HttpModule, CqrsModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
