import React, { useState } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Tabs } from 'common/Tabs';

import classes from './AccountStaff.module.scss';
import { Button } from 'common/Button/Button';
import { useUserDataContext } from 'context/UserDataContext';
import { ConnectToEstablishment } from './ConnectToEstablishment/ConnectToEstablishment';
import { Popup } from '../../../common/Popup';
import QRCode from 'qrcode.react';

export function AccountStaff() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isShowQr, setIsShowQr] = useState(false);
  const { path } = useRouteMatch();
  const { userData } = useUserDataContext();

  const accountTubs = [
    { id: 1, to: 'month', text: 'За месяц' },
    {
      id: 2,
      to: 'all-time',
      text: 'За все время работы',
    },
    {
      id: 3,
      to: 'daily',
      text: 'Среднее в день',
    },
    { id: 4, to: 'today', text: 'За сегодня' },
  ];

  return (
    <div className={classes.accountStaff}>
      <Button
        className={classes.accountStaff__button}
        onClick={() => setisModalOpen(true)}
      >
        Подключиться к заведению
      </Button>
      <Button
        className={classes.accountStaff__button}
        onClick={() => setIsShowQr(true)}
      >
        Показать ваш qr для оплаты
      </Button>
      {
        <Popup isOpen={isShowQr} onClose={() => setIsShowQr(false)}>
          <QRCode
            value={`https://possession-nearly-answers-journals.trycloudflare.com/${userData?.id}/payment`}
          />
        </Popup>
      }
      <ConnectToEstablishment
        isModalOpen={isModalOpen}
        setisModalOpen={setisModalOpen}
      />
      {!!userData?.ownEstablishments.length && (
        <>
          <div className={classes.accountStaff__wrapper}>
            <h3 className={classes.accountStaff__title}>Мои места:</h3>
            <div className={classes.accountStaff__places}>
              {userData.ownEstablishments.map((establishment) => (
                <div className={classes.accountStaff__place}>
                  <div>адресс: {establishment.address}</div>
                  <div>название: {establishment.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.accountStaff__wrapper}>
            <h3 className={classes.accountStaff__title}>Мои чаевые:</h3>
          </div>
          <div className={classes.accountStaff__tips}>
            <Tabs tabsOptions={accountTubs} />
            {accountTubs.map((item) => (
              <Route key={item.id} path={`${path}/${item.to}`}>
                <span className={classes.accountStaff__text}>0 ₽</span>
              </Route>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
