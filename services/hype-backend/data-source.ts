import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { HypeClaim, HypeReward, HypeUser } from './src/entities';
import { Schema1683716654047 } from './src/migrations/1683716654047-Schema';
dotenv.config();

const getDataSourceOptions = (): DataSourceOptions => {
  return process.env.DATABASE_URL
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_DATABASE || 'hypepool',
      };
};

const getSslRejectUnauthorized = () => {
  return process.env.DB_SSL_REJECT_UNAUTHORIZED === 'false'
    ? {}
    : {
        ssl: {
          rejectUnauthorized: false,
        },
      };
};

const DataSourceConfig = new DataSource({
  ...getDataSourceOptions(),
  ...getSslRejectUnauthorized(),
  synchronize: false,
  migrationsRun: true,
  logging: process.env.NODE_ENV !== 'production',
  // entities: [`${__dirname}/src/entities/*.entity{.ts,.js}`],
  entities: [HypeUser, HypeReward, HypeClaim],
  // migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
  migrations: [Schema1683716654047],
  migrationsTableName: 'migrations_hype_pool',
} as DataSourceOptions);

export default DataSourceConfig;
