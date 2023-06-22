import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { HypeClaim, HypeReward, HypeUser, Group } from './src/entities';
import { Schema1683716654047 } from './src/migrations/1683716654047-Schema';
import { Schema1683825323705 } from './src/migrations/1683825323705-Group';
import { RewardDate1686837924459 } from './src/migrations/1686837924459-RewardDate';
import { RewardClaimAssociation1687179992085 } from './src/migrations/1687179992085-RewardClaimAssociation';
import { RewardColumnNameUpdate1687273276705 } from './src/migrations/1687273276705-RewardColumnNameUpdate';
import { ImpressionDecimal1687435940615 } from './src/migrations/1687435940615-ImpressionDecimal';

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
  entities: [HypeUser, HypeReward, HypeClaim, Group],
  // migrations: [`${__dirname}/src/migrations/*{.ts,.js}`],
  migrations: [
    Schema1683716654047,
    Schema1683825323705,
    RewardDate1686837924459,
    RewardClaimAssociation1687179992085,
    RewardColumnNameUpdate1687273276705,
    ImpressionDecimal1687435940615,
  ],
  migrationsTableName: 'migrations_hype_pool',
} as DataSourceOptions);

export default DataSourceConfig;
