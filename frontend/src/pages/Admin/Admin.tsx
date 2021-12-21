import React from 'react';
import { useHistory } from 'react-router';
import Main from '../../assets/icons/Main.png';
import { Button } from 'common/Button/Button';
import { Layout } from 'common/Layout';
import { Routes } from 'routes';

import classes from './Admin.module.scss';

export function Admin() {
  const history = useHistory();

  function redirectToPage(route: Routes) {
    history.push({ pathname: route });
  }

  return (
    <Layout>
      <div className={classes.main}>
        <div className={classes.main__content}>
          <h1 className={classes.main__title}>
            Простая система безналичных чаевых.
          </h1>
          <div className={classes.main__button_container}>
            <Button className={classes.main__button} theme="violet">
              Оставить чаевые
            </Button>
            <Button
              className={classes.main__button}
              onClick={() => redirectToPage(Routes.REGISTRATION)}
            >
              Создать личный кабинет
            </Button>
          </div>
        </div>

        <img
          className={classes.main__image}
          src={Main}
          alt="отсканируйте qr-код для оплаты"
        />
      </div>
    </Layout>
  );
}
