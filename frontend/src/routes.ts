import React from 'react';
import { Account, Admin, Registration, Authorization, Payment } from 'pages';

export enum Routes {
  MAIN = '/',
  REGISTRATION = '/registration',
  AUTHORIZATION = '/authorization',
  ACCOUNT = '/account',
  ACCOUNT_STAFF = '/account/staff',
  ACCOUNT_OWNER = '/account/owner',
  ACCOUNT_CUSTOMER = '/account/customer',
  PAY_TO = '/:userId(\\d+)/payment',
}
export interface RouteEntity {
  Component: React.FC<React.PropsWithChildren<any>>;
  path?: string;
  exact?: boolean;
}

type RoutesCollection = {
  [key: string]: RouteEntity;
};

export const routes: RoutesCollection = {
  main: {
    path: Routes.MAIN,
    exact: true,
    Component: Admin,
  },
  registration: {
    path: Routes.REGISTRATION,
    exact: true,
    Component: Registration,
  },
  authorization: {
    path: Routes.AUTHORIZATION,
    exact: true,
    Component: Authorization,
  },
  account: {
    path: Routes.ACCOUNT,
    exact: false,
    Component: Account,
  },
  pay: {
    path: Routes.PAY_TO,
    exact: false,
    Component: Payment,
  },
};
