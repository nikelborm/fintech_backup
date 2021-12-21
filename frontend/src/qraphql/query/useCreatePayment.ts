import { gql, useMutation } from '@apollo/client';

const CREATE_PAYMENT = gql`
  mutation CreatePayment($tipAmount: Int!) {
    sendTipAttempt(tipAmount: $tipAmount)
  }
`;

export function useCreatePayment(tipAmount: number) {
  const [createPayment] = useMutation(CREATE_PAYMENT);

  return createPayment({ variables: { tipAmount } });
}
