import { useMutation, gql } from '@apollo/client';

const CONNECT_TO_ESTABLISHMENT = gql`
  mutation connectToEstablishment(
    $connectToEstablishmentInput: ConnectToEstablishmentInput!
  ) {
    connectToEstablishment(
      connectToEstablishmentInput: $connectToEstablishmentInput
    ) {
      id
      code
      createdAt
      createdByUser {
        id
        firstName
        lastName
      }
      establishment {
        id
        name
      }
      wasUsedAt
      willExpireAt
      wasUsedToInviteUser {
        id
        firstName
        lastName
      }
    }
  }
`;

export function useConnectToEstablishment(matchRequestCode: string) {
  const [connectToEstablishmentMutation] = useMutation(
    CONNECT_TO_ESTABLISHMENT,
    {
      variables: {
        connectToEstablishmentInput: {
          matchRequestCode: matchRequestCode,
        },
      },
    }
  );

  return { connectToEstablishmentMutation };
}
