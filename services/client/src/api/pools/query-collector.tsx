export const HYPEPOOL_QUERIES = {
  poolsSearchQuery: `
    query HypePoolsSearch($first: Int!, $skip: Int!, $text: String) {
      poolSearch(first: $first, skip: $skip, text: $text) {
        id
        title
        uri
        tokenName
        network
        tokenAddress
        creator
        active
        projectName
        description
        projectDescription
        uri
        cap
        creator
        endDate
        impressionReward
      }
    }
  `,
  poolsQuery: `
    query HypePools($first: Int!, $skip: Int!, $text: String) {
      hypePools(first: $first, skip: $skip, text: $text) {
        id
        title
        uri
        tokenName
        network
        tokenAddress
        creator
        active
        projectName
        description
        projectDescription
        uri
        cap
        creator
        endDate
        impressionReward
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
        uri
        tokenName
        network
        tokenAddress
        creator
        active
        projectName
        description
        projectDescription
        uri
        cap
        creator
        endDate
        impressionReward
      }
    }
  `,

  poolQuery: `
    query HypePoolById($id: Int) {
      hypePool(
        id: $id
      ) {
        id
        title
        uri
        tokenName
        network
        tokenAddress
        creator
        active
        projectName
        description
        projectDescription
        uri
        cap
        creator
        endDate
        impressionReward
      }
    }
  `,
};
