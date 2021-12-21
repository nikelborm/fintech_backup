import { CreateTransactionInput } from '../input/CreateTransactionLogInput';
import { useMutation, gql } from '@apollo/client';

const CREATE_TRANSACTION_LOG = gql`
  mutation CreateTransactionLog(
    $CreateTransactionLog: CreateTransactionInput!
  ) {
    createTransaction(createTransactionInput: $CreateTransactionLog) {
      id
      comment
      creationDate
      currency
      moneyAmount
      recipient {
        id
        firstName
        lastName
      }
      sender {
        id
        firstName
        lastName
      }
    }
  }
`;

export function useCreateTransactionLog(
  createTransactionInput: CreateTransactionInput
) {
  const [createTransactionLog] = useMutation(CREATE_TRANSACTION_LOG);

  return createTransactionLog({
    variables: { CreateTransactionLog: createTransactionInput },
  });
}
