import {gql} from '@apollo/client';

const charactersQuery = gql`
  query characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
      }
      results {
        id
        name
        image
        location {
          id
          name
        }
        episode {
          id
          name
          air_date
        }
      }
    }
  }
`;

export default charactersQuery;
