import { gql, useLazyQuery } from '@apollo/client';

const GET_USER = gql`
  query getUser($id: Int!) {
    user(id: $id) {
      id
      firstName
      lastName
      middleName
      email
      password
      isOwner
      isCustomer
      isEmployer
      ownEstablishments {
        id
        address
        ITN
        name
      }
      employedInEstablishments {
        id
        address
        ITN
        name
      }
    }
  }
`;

export function useGetUserQuery(id: number) {
  const [loadUserById, { data }] = useLazyQuery(GET_USER, {
    variables: { id },
  });

  return { loadUserById, data };
}
