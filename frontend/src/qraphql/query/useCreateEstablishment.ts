import { CreateEstablishmentInput } from '../input/createEstablishmentInput';
import { useMutation, gql } from '@apollo/client';

const CREATE_ESTABLISHMENT = gql`
  mutation CreateEstablishment(
    $CreateEstablishmentInput: CreateEstablishmentInput!
  ) {
    createEstablishment(createEstablishmentInput: $CreateEstablishmentInput) {
      id
      name
      address
      ITN
    }
  }
`;

export function useCreateEstablishment() {
  const [createEstablishment] = useMutation(CREATE_ESTABLISHMENT);
  return (
    createEstablishmentInput: CreateEstablishmentInput,
    userId: number
  ) => {
    createEstablishmentInput.ownersIds = [userId];
    createEstablishmentInput.employersIds = [];
    createEstablishmentInput.ITN = createEstablishmentInput.ITN.toString();
    return createEstablishment({
      variables: { CreateEstablishmentInput: createEstablishmentInput },
    });
  };
}
