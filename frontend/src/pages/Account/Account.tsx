import React, { useEffect } from 'react';

import { Tabs } from 'common/Tabs';
import { Layout } from 'common/Layout';

import classes from './Account.module.scss';
import { Route, useHistory } from 'react-router-dom';
import { AccountStaff } from './AccountStaff';
import { AccountOwner } from './AccountOwner';
import { AccountCustomer } from './AccountCustomer';
import { Routes } from 'routes';
import { useUserDataContext } from 'context/UserDataContext';

export function Account() {
  const history = useHistory();
  const { userData, loading } = useUserDataContext();

  useEffect(() => {
    if (!userData && !loading) {
      history.push({ pathname: Routes.MAIN });
    }
  }, [userData, loading]);

  const mockAccountTubs = [
    !!userData?.isCustomer ? { id: 1, to: 'customer', text: 'Я клиент' } : null,
    !!userData?.isEmployer ? { id: 2, to: 'staff', text: 'Я сотрудник' } : null,
    !!userData?.isOwner ? { id: 3, to: 'owner', text: 'Я работодатель' } : null,
  ];

  return (
    <Layout>
      <div className={classes.account}>
        <Tabs tabsOptions={mockAccountTubs} />
        <Route exact={false} path={Routes.ACCOUNT_CUSTOMER}>
          <AccountCustomer />
        </Route>
        <Route exact={false} path={Routes.ACCOUNT_STAFF}>
          <AccountStaff />
        </Route>
        <Route exact={false} path={Routes.ACCOUNT_OWNER}>
          <AccountOwner />
        </Route>
      </div>
    </Layout>
  );
}
