export const HYPEPOOL_QUERIES = {
  poolsSearchQuery: `
    query HypePoolsSearch($first: Int!, $skip: Int!, $text: String) {
      poolSearch(first: $first, skip: $skip, text: $text) {
        id
        title
        projectName
        description
        active
        uri
        token
        cap
        creator
        endDate
        minReward
      }
    }
  `,
  poolsQuery: `
    query HypePools($first: Int!, $skip: Int!, $text: String) {
      hypePools(first: $first, skip: $skip, text: $text) {
        id
        title
        projectName
        description
        active
        uri
        token
        cap
        creator
        endDate
        minReward
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
        projectName
        description
        active
        uri
        token
        cap
        creator
        endDate
        minReward
      }
    }
  `,
};
