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
        minReward
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
        minReward
        impressionReward
      }
    }
  `,
  profilePoolsQuery: `
    query HypePoolsByCreator($creator: String) {
      hypePools(
        creator: $creator
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
        minReward
        impressionReward
      }
    }
  `,
};
