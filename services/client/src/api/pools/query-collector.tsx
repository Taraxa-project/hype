export const HYPEPOOL_QUERIES = {
  poolsSearchQuery: `
    query HypePoolsSearch($first: Int!, $skip: Int!, $orderBy: String, $orderDirection: String, $text: String, $endDate_gt: BigInt, $endDate_lt: BigInt) {
      poolSearch(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, text: $text, where: {remainingFunds_not: 0, endDate_gt: $endDate_gt, endDate_lt: $endDate_lt}) {
        id
        title
        tokenName
        network
        tokenAddress
        status
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
        campaignWord
        remainingFunds
        imageUri,
        leaderRewards
      }
    }
  `,

  poolsQuery: `
    query HypePools($first: Int!, $skip: Int!, $orderBy: String, $orderDirection: String, $text: String, $endDate_gt: BigInt, $endDate_lt: BigInt) {
      hypePools(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, text: $text, where: {remainingFunds_not: 0, endDate_gt: $endDate_gt, endDate_lt: $endDate_lt}) {
        id
        title
        tokenName
        network
        tokenAddress
        status
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
        campaignWord
        remainingFunds
        imageUri,
        leaderRewards
      }
    }
  `,

  profilePoolsQuery: `
    query HypePoolsByCreator($creator: String, $orderBy: String, $orderDirection: String) {
      hypePools(
        where: { creator: $creator },
        orderBy: $orderBy,
        orderDirection: $orderDirection
      ) {
        id
        title
        tokenName
        network
        tokenAddress
        status
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
        campaignWord
        remainingFunds
        imageUri,
        leaderRewards
      }
    }
  `,

  poolQuery: `
    query HypePoolById($id: Bytes) {
      hypePool(
        id: $id
      ) {
        id
        title
        tokenName
        network
        tokenAddress
        status
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
        campaignWord
        remainingFunds
        imageUri,
        leaderRewards
      }
    }
  `,
};
