import { gql } from "@apollo/client";

const RepositoryQ = gql`
  query Repository($username: String!){
    user(login: $username) {
      id
      name
      repositories(first: 10) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          name
          description
          forkCount
          stargazerCount
          issues(last: 100){
            nodes {
              id
              title
              state
              bodyText
              resourcePath
              url
              author {
                login
              }
            }
          }
          languages(first: 5) {
            nodes {
              name
            }
          }
        }
      }
    }
  }
`;
export default RepositoryQ;
