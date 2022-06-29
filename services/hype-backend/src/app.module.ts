import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolModule, HypePool } from '@taraxa-hype/pool';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { AuthModule } from '@taraxa-hype/auth';
import { general, auth, ethereum } from '@taraxa-hype/config';
import { BlockchainModule } from '@taraxa-hype/blockchain';
import { RewardModule } from './modules/reward/reward.module';

const getEnvFilePath = () => {
  const pathsToTest = ['../.env', '../../.env', '../../../.env'];

  for (const pathToTest of pathsToTest) {
    const resolvedPath = resolve(__dirname, pathToTest);

    if (existsSync(resolvedPath)) {
      return resolvedPath;
    }
  }
};

export const entities: Function[] = [HypePool];

const HypeAppTypeOrmModule = () => {
  return process.env.DATABASE_URL
    ? TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        entities,
        autoLoadEntities: true,
        logging: ['info'],
      })
    : TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || 'hypepool',
        entities,
        synchronize: false,
        autoLoadEntities: true,
        logging: ['info'],
      });
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      isGlobal: true,
      load: [general, auth, ethereum],
    }),
    HypeAppTypeOrmModule(),
    AuthModule,
    PoolModule,
    BlockchainModule,
    RewardModule,
  ],
})
export class AppModule {}
