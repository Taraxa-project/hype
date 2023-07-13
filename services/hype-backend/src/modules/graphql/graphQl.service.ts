import { Injectable } from '@nestjs/common';
import { InjectGraphQLClient } from '@golevelup/nestjs-graphql-request';
import { gql, GraphQLClient } from 'graphql-request';
import { IPool } from '../../models';
import { DateTime } from 'luxon';

@Injectable()
export class GraphQlService {
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

  async getActivePools(): Promise<{ hypePools: IPool[] }> {
    const now = DateTime.utc();
    const endOfLastWeek = now
      .minus({ week: 1 })
      .endOf('week')
      .set({ hour: 23, minute: 59, second: 59, weekday: 6 });
    const unixTimestamp = Math.floor(endOfLastWeek.toMillis() / 1000);
    return await this.graphQLClient.request(
      gql`
        query HypePools(
          $first: Int!
          $skip: Int!
          $orderBy: String
          $orderDirection: String
          $text: String
          $endDate_gt: BigInt
        ) {
          hypePools(
            first: $first
            skip: $skip
            orderBy: $orderBy
            orderDirection: $orderDirection
            text: $text
            where: { remainingFunds_not: 0, endDate_gt: $endDate_gt }
          ) {
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
            remainingFunds
            imageUri
          }
        }
      `,
      {
        first: 100,
        skip: 0,
        orderBy: 'endDate',
        orderDirection: 'desc',
        endDate_gt: unixTimestamp,
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
