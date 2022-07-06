import { ExecutionContext, Logger, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { useContainer } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '../.env' });

import { entities, AppModule } from '../src/app.module';
import { PoolsService } from '../src/modules/pool/pool.service';
import { ConfigService } from '@nestjs/config';
import { HypePool } from '../src/modules/pool';
import { HypeUser } from '../src/modules/user';
import { UsersService } from '../src/modules/user/user.service';
import { WalletGuard } from '../src/modules/auth/wallet.guard';

const testLogger = new Logger('e2e');

export const bootstrapTestInstance: any = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT) ?? 5432,
        username: process.env.DB_USERNAME ?? 'postgres',
        password: process.env.DB_PASSWORD ?? 'postgres',
        database: process.env.DB_TEST_DATABASE ?? 'origin',
        entities,
        dropSchema: true,
        synchronize: true,
      }),
      TypeOrmModule.forFeature([HypePool, HypeUser]),
      AppModule,
    ],
  })
    .overrideGuard(WalletGuard)
    .useValue({
      canActivate: () => {
        return true;
      },
    })
    .compile();

  const app = moduleFixture.createNestApplication();
  const poolService = await app.resolve<PoolsService>(PoolsService);
  const userService = await app.resolve<UsersService>(UsersService);
  const configService = await app.resolve<ConfigService>(ConfigService);

  app.useLogger(testLogger);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return {
    poolService,
    configService,
    app,
  };
};
