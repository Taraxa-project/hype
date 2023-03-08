import { Module } from '@nestjs/common';
import { GraphQLRequestModule } from '@golevelup/nestjs-graphql-request';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQlService } from './graphQl.service';

@Module({
  imports: [
    GraphQLRequestModule.forRootAsync(GraphQLRequestModule, {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          endpoint: config.get<string>('auth.subGraphEndpoint'),
        };
      },
    }),
  ],
  providers: [GraphQlService],
  exports: [GraphQlService],
})
export class GraphQlModule {}
