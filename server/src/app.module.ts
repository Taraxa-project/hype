import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      isGlobal: true,
      load: [config.generalConfig, config.database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(config.database)],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('db.host') || '127.0.0.1',
        port: configService.get<number>('db.port') || 5432,
        username: configService.get<string>('db.user') || 'postgres',
        password: configService.get<string>('db.pass') || 'postgres',
        database: configService.get<string>('db.name') || 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
