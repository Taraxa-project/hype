import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth';
import { UserController } from './user.controller';
import { HypeUser } from './user.entity';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([HypeUser]), AuthModule],
  providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}
