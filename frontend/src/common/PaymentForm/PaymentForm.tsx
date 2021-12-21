import { FC, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCreatePaymentIntentMutation } from '../../qraphql/query/useCreatePaymentIntentMutation';
import * as React from 'react';
import { CheckoutForm } from './CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51K5VYgHRk3l5AM53fRE1vM25j17A9rOej8N6OScI5W1Cz8yOB3TKCFRIHGNwoYceS14LmxB9MqA6GX7H2OtBDRom002aylE1j9'
);

interface CreatePaymentProps {
  tipAmount: number;
  userId: number;
}

export const PaymentForm: FC<CreatePaymentProps> = ({ tipAmount, userId }) => {
  const [clientSecret, setClientSecret] = useState('');
  const createPaymentIntent = useCreatePaymentIntentMutation();

  useEffect(() => {
    const fetch = async () => {
      const clientSecret = await createPaymentIntent(tipAmount, userId);
      setClientSecret(clientSecret.data.createPaymentIntent);
    };
    fetch();
  }, []);

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
            appearance: { theme: 'stripe' },
          }}
        >
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
};
