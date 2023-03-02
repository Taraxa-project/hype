export const HYPEPOOL_QUERIES = {
  poolsSearchQuery: `
    query HypePoolsSearch($first: Int!, $skip: Int!, $text: String) {
      poolSearch(first: $first, skip: $skip, text: $text) {
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
  poolsQuery: `
    query HypePools($first: Int!, $skip: Int!, $text: String) {
      hypePools(first: $first, skip: $skip, text: $text) {
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
  profilePoolsQuery: `
    query HypePoolsByCreator($creator: String) {
      hypePools(
        where: { creator: $creator }
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
      }
    }
  `,
};
