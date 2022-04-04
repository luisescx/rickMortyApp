import {gql} from '@apollo/client';

const episodesQuery = gql`
  query episodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        air_date
        characters {
          name
          image
          name
        }
      }
    }
  }
`;

export default episodesQuery;
