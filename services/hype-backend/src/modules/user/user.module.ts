import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth';
import { UserController } from './user.controller';
import { HypeUser } from '../../entities/user.entity';
import { UsersService } from './user.service';
import { HypeReward } from '../reward';

@Module({
  imports: [TypeOrmModule.forFeature([HypeUser, HypeReward]), AuthModule],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UserModule {}
