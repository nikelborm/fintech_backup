import { useQuery, gql } from '@apollo/client';
import { Establishment } from '../../types';

const ESTABLISHMENTS = gql`
  query GetEstabliments {
    establishments {
      id
      name
      address
      ITN
    }
  }
`;

export function useGetEstablishments(): { establishments: Establishment[] } {
  const establishments = useQuery(ESTABLISHMENTS);
  return establishments.data;
}
