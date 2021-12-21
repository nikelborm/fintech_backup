import React from 'react';

import { Button } from 'common/Button/Button';
import { useUserDataContext } from 'context/UserDataContext';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Routes } from 'routes';

import classes from './Header.module.scss';

export default function Header() {
  const history = useHistory();
  function pageChange(route: Routes) {
    history.push({ pathname: route });
  }
  const { userData, deleteCookie } = useUserDataContext();
  const { path } = useRouteMatch();

  return (
    <div className={classes.header}>
      <Button
        className={classes.header__logo}
        onClick={() => pageChange(Routes.MAIN)}
      >
        НАЧАЙ
      </Button>
      <div className={classes.header__content}>
        {!userData && (
          <Button onClick={() => pageChange(Routes.AUTHORIZATION)}>
            Войти
          </Button>
        )}
        {userData && path !== Routes.ACCOUNT && (
          <Button onClick={() => pageChange(Routes.ACCOUNT)}>
            Личный кабинет
          </Button>
        )}
        {userData && path === Routes.ACCOUNT && (
          <Button onClick={() => deleteCookie()}>Выйти</Button>
        )}
      </div>
    </div>
  );
}
