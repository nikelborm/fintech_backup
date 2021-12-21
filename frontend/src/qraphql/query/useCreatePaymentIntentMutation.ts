import { gql, useMutation } from '@apollo/client';

const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($tipAmount: Int!, $recipientUserId: Int!) {
    createPaymentIntent(
      tipAmount: $tipAmount
      recipientUserId: $recipientUserId
    )
  }
`;

export function useCreatePaymentIntentMutation() {
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  return (tipAmount: number, recipientUserId: number) => {
    return createPaymentIntent({
      variables: { tipAmount, recipientUserId },
    });
  };
}
