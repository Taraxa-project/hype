export const HYPEPOOL_QUERIES = {
  poolsSearchQuery: `
    query HypePoolsSearch($first: Int!, $skip: Int!, $orderBy: String, $orderDirection: String, $text: String) {
      poolSearch(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, text: $text) {
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
  poolsQuery: `
    query HypePools($first: Int!, $skip: Int!, $orderBy: String, $orderDirection: String, $text: String) {
      hypePools(first: $first, skip: $skip, orderBy: $orderBy, orderDirection: $orderDirection, text: $text) {
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
};
