import React, { useState } from 'react';

import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { useRegisterUser } from './hooks/useRegisterUser';
import { useUserDataContext } from 'context/UserDataContext';
import { Layout } from 'common/Layout';

import classes from './Authorization.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { Routes } from 'routes';

export function Authorization() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [isLoginDataValid, setIsLoginDataValid] = useState(false);

  const { refetchCookie, userDataRefetch } = useUserDataContext();
  const { loginUser, loading } = useRegisterUser();

  const history = useHistory();

  async function loginUserForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await loginUser({
        variables: {
          username: loginData.email,
          password: loginData.password,
        },
      });
      refetchCookie();
      await userDataRefetch();
      setIsLoginDataValid(false);
      history.push({ pathname: Routes.ACCOUNT });
    } catch (e) {
      setIsLoginDataValid(true);
    }
  }

  return (
    <Layout>
      <div className={classes.authorization}>
        <h1 className={classes.authorization__title}>Войти в личный кабинет</h1>
        <form onSubmit={(e) => loginUserForm(e)}>
          <Input
            label="Почта"
            autoComplete="username"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          <Input
            label="Пароль"
            type="password"
            autoComplete="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
          <Button
            className={classes.authorization__button}
            disabled={loading}
            theme="violet"
            type="submit"
          >
            Войти
          </Button>
          {isLoginDataValid && 'Что-то пошло не так'}
        </form>
        <div className={classes.authorization__create}>
          <p>Еще нет личного кабинета?</p>
          <Link
            className={classes.authorization__create_link}
            to={{ pathname: Routes.REGISTRATION }}
          >
            Создать
          </Link>
        </div>
      </div>
    </Layout>
  );
}
