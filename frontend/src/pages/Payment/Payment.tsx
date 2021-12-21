import React, { FC, useState } from 'react';

import { Layout } from '../../common/Layout';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { PaymentForm } from 'common/PaymentForm/PaymentForm';
import { useParams } from 'react-router-dom';
import classes from './Payment.module.scss';

export const Payment: FC = () => {
  const [amount, setAmount] = useState(0);
  const { userId } = useParams<{ userId: string }>();
  const [error, setError] = useState('');

  function showPaymentPage() {
    if (amount >= 10000) {
      setIsShowPaymentForm(true);
    } else setError('Минимальные чаевые составляют 10000');
  }

  const [isShowPaymentForm, setIsShowPaymentForm] = useState(false);
  return (
    <>
      <Layout>
        {!isShowPaymentForm ? (
          <div className={classes.payment}>
            <Input
              type="number"
              className={classes.payment__input}
              value={String(amount)}
              onChange={(e) => setAmount(Number(e.target.value))}
              label={'Введите количество чаевых'}
            />
            <Button onClick={showPaymentPage}>Перейти к оплате</Button>
            {error}
          </div>
        ) : (
          <PaymentForm tipAmount={amount} userId={Number(userId)} />
        )}
      </Layout>
    </>
  );
};
