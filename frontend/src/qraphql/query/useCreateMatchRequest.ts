import { useMutation, gql } from '@apollo/client';

const CREATE_MATCH_REQUEST = gql`
  mutation CreateMatchRequest(
    $CreateMatchRequestInput: CreateMatchRequestInput!
  ) {
    createMatchRequest(createMatchRequestInput: $CreateMatchRequestInput) {
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
        address
      }
      wasUsedAt
      willExpireAt
    }
  }
`;

export function useCreateMatchRequest() {
  const [createMatchRequest] = useMutation(CREATE_MATCH_REQUEST);
  return (createMatchRequestInput: CreateMatchRequestInput) => {
    return createMatchRequest({
      variables: { CreateMatchRequestInput: createMatchRequestInput },
    });
  };
}

export interface CreateMatchRequestInput {
  establishmentId: number;
}
