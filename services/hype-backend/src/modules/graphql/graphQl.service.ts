import { Injectable, Logger } from '@nestjs/common';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { gql, GraphQLClient } from 'graphql-request';
import { IPool } from '../../models';

@Injectable()
export class GraphQlService {
  private logger = new Logger(GraphQlService.name);

  constructor(
    @InjectGraphQLClient()
    private readonly graphQLClient: GraphQLClient,
  ) {}

  async getPoolById(id: string): Promise<{ hypePool: IPool }> {
    return await this.graphQLClient.request(
      gql`
        query HypePoolById($id: Bytes) {
          hypePool(id: $id) {
            id
            title
            tokenName
            network
            tokenAddress
            active
            projectName
            description
            projectDescription
            uri
            cap
            creator
            endDate
            startDate
            duration
            impressionReward
            word
          }
        }
      `,
      {
        id,
      },
    );
  }

  async getClaimedEvents(
    poolId: string,
    receiver: string,
    weiAmount: string,
  ): Promise<{
    claimedEvents: {
      poolId: string;
      receiver: string;
      weiAmount: string;
    }[];
  }> {
    return await this.graphQLClient.request(
      gql`
        query ClaimedEvents(
          $poolId: String
          $receiver: String
          $weiAmount: String
        ) {
          claimedEvents(
            where: {
              poolId: $poolId
              receiver: $receiver
              weiAmount: $weiAmount
            }
          ) {
            weiAmount
            receiver
            poolId
          }
        }
      `,
      {
        poolId,
        receiver,
        weiAmount,
      },
    );
  }
}
