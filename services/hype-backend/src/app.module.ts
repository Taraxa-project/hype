import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { AuthModule } from '@taraxa-hype/auth';
import { general, auth, ethereum, ipfs } from '@taraxa-hype/config';
import { BlockchainModule } from '@taraxa-hype/blockchain';
import { RewardModule } from '@taraxa-hype/reward';
import { HealthModule } from '@taraxa-hype/health';
import { UserModule } from '@taraxa-hype/user';
import { IpfsModule } from '@taraxa-hype/ipfs';
import * as dotenv from 'dotenv';
import { HypeUser, HypeReward, HypeClaim } from './entities';

dotenv.config();

const getEnvFilePath = () => {
  const pathsToTest = ['../.env', '../../.env', '../../../.env'];

  for (const pathToTest of pathsToTest) {
    const resolvedPath = resolve(__dirname, pathToTest);

    if (existsSync(resolvedPath)) {
      return resolvedPath;
    }
  }
};

export const entities = [HypeUser, HypeReward, HypeClaim];

const HypeAppTypeOrmModule = () => {
  let typeOrmOptions: TypeOrmModuleOptions;
  const baseConnectionOptions: TypeOrmModuleOptions = process.env.DATABASE_URL
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities,
        synchronize: false,
        autoLoadEntities: true,
        logging: ['info'],
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || 'hypepool',
        entities,
        synchronize: false,
        autoLoadEntities: true,
        logging: ['info'],
      };

  if (process.env.DATABASE_CERT) {
    typeOrmOptions = {
      ...baseConnectionOptions,
      ssl: {
        rejectUnauthorized: false,
        ca: process.env.DATABASE_CERT,
      },
    };
  } else if (process.env.DB_SSL_REJECT_UNAUTHORIZED === 'false') {
    typeOrmOptions = {
      ...baseConnectionOptions,
    };
  } else {
    typeOrmOptions = {
      ...baseConnectionOptions,
      ssl: {
        rejectUnauthorized: false,
      },
    };
  }

  return TypeOrmModule.forRoot(typeOrmOptions);
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(),
      isGlobal: true,
      load: [general, auth, ethereum, ipfs],
    }),
    HypeAppTypeOrmModule(),
    AuthModule,
    BlockchainModule,
    RewardModule,
    UserModule,
    HealthModule,
    IpfsModule,
  ],
})
export class AppModule {}
