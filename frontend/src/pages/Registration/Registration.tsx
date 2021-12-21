import React, { useState } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import isAlpha from 'validator/es/lib/isAlpha';
import { validatePassword } from '../../utils/utils';
import { useRegisterUser } from './hooks/useRegisterUser';

import { Button } from 'common/Button/Button';
import { Layout } from 'common/Layout';
import { Input } from 'common/Input/Input';
import { ValidInputPassword } from 'common/ValidInputPassword/ValidInputPassword';
import { Checkbox } from 'common/Checkbox/Checkbox';
import classes from './Registration.module.scss';
import { useHistory } from 'react-router';
import { Routes } from 'routes';
import { Link } from 'react-router-dom';

interface RegistrationData {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  isOwner: boolean;
  isCustomer: boolean;
  isEmployer: boolean;
}

interface RegistrationDataValid {
  isFirstNameValid: boolean;
  isLastNameValid: boolean;
  isMiddleNameValid: boolean;
  isEmailValid: boolean;
  isPasswordValid: boolean;
}

export function Registration() {
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    isCustomer: true,
    isOwner: false,
    isEmployer: false,
  });

  const [isRegisterDataValid, setIsRegisterDataValid] =
    useState<RegistrationDataValid>({
      isFirstNameValid: true,
      isLastNameValid: true,
      isMiddleNameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
    });

  // const [isEmailUnique, setisEmailUnique] = useState(true);
  const [error, seterror] = useState(false);

  const history = useHistory();

  const { registerUser, loading } = useRegisterUser();

  function checkIsAlpha(chackableString: string) {
    return (
      isAlpha(chackableString.replace(/\s/g, ''), 'en-GB') ||
      isAlpha(chackableString.replace(/\s/g, ''), 'ru-RU')
    );
  }

  function checkForValidation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsRegisterDataValid({
      isEmailValid: !!isEmail(registrationData.email.trim().toLowerCase()),
      isFirstNameValid: !!checkIsAlpha(registrationData.firstName),
      isLastNameValid: !!checkIsAlpha(registrationData.lastName),
      isMiddleNameValid: !!checkIsAlpha(registrationData.middleName),
      isPasswordValid: !!validatePassword(registrationData.password),
    });
  }

  async function registerUserForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (
        isEmail(registrationData.email.trim().toLowerCase()) &&
        checkIsAlpha(registrationData.firstName) &&
        checkIsAlpha(registrationData.lastName) &&
        checkIsAlpha(registrationData.middleName) &&
        validatePassword(registrationData.password)
      ) {
        await registerUser({
          variables: {
            createUserInput: {
              firstName: registrationData.firstName.trim().replace(/\s+/g, ' '),
              lastName: registrationData.lastName.trim().replace(/\s+/g, ' '),
              middleName: registrationData.middleName
                .trim()
                .replace(/\s+/g, ' '),
              email: registrationData.email.trim().toLowerCase(),
              password: registrationData.password,
              isOwner: registrationData.isOwner,
              isCustomer: registrationData.isCustomer,
              isEmployer: registrationData.isEmployer,
            },
          },
        });
        history.push({ pathname: Routes.AUTHORIZATION });
      } else {
        checkForValidation(e);
      }
    } catch (e) {
      // if (
      //   e?.graphQLErrors?.[0]?.extensions.code ===
      //     'UNIQUE_CONSTRAINT_VIOLATION' &&
      //   e?.graphQLErrors?.[0]?.extensions.argumentName === 'email'
      // ) {
      //   setisEmailUnique(true);
      // }
      seterror(true);
    }
  }

  return (
    <Layout>
      <div className={classes.registration}>
        <h1 className={classes.registration__title}>Создать личный кабинет</h1>
        <form onSubmit={(e) => registerUserForm(e)}>
          <Input
            label="Имя"
            value={registrationData.firstName}
            error={isRegisterDataValid.isFirstNameValid}
            errorMessage="Введите корректное имя"
            onChange={(e) => {
              setRegistrationData((prevState) => ({
                ...prevState,
                firstName: e.target.value,
              }));
              setIsRegisterDataValid((prevState) => ({
                ...prevState,
                isFirstNameValid: true,
              }));
            }}
          />
          <Input
            label="Фамилия"
            value={registrationData.lastName}
            error={isRegisterDataValid.isLastNameValid}
            errorMessage="Введите корректную фамилию"
            onChange={(e) => {
              setRegistrationData((prevState) => ({
                ...prevState,
                lastName: e.target.value,
              }));
              setIsRegisterDataValid((prevState) => ({
                ...prevState,
                isLastNameValid: true,
              }));
            }}
          />
          <Input
            label="Отчество"
            value={registrationData.middleName}
            error={isRegisterDataValid.isMiddleNameValid}
            errorMessage="Введите корректное отчество"
            onChange={(e) => {
              setRegistrationData((prevState) => ({
                ...prevState,
                middleName: e.target.value,
              }));
              setIsRegisterDataValid((prevState) => ({
                ...prevState,
                isMiddleNameValid: true,
              }));
            }}
          />
          <Input
            label="E-mail"
            autoComplete="username"
            value={registrationData.email}
            error={isRegisterDataValid.isEmailValid}
            errorMessage="Введите корректный email"
            onChange={(e) => {
              setRegistrationData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
              setIsRegisterDataValid((prevState) => ({
                ...prevState,
                isEmailValid: true,
              }));
            }}
          />
          <ValidInputPassword
            password={registrationData.password}
            label="Пароль"
            validStatePassword={isRegisterDataValid.isPasswordValid}
            onChange={(e) => {
              setRegistrationData((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
              setIsRegisterDataValid((prevState) => ({
                ...prevState,
                isPasswordValid: true,
              }));
            }}
          />
          <div className={classes.registration__role}>
            <Checkbox
              checked={registrationData.isCustomer}
              checkboxClassName={classes.registration__checkbox}
              readOnly
              text="Я клиент"
            />
            <Checkbox
              checked={registrationData.isOwner}
              checkboxClassName={classes.registration__checkbox}
              text="Я работодатель"
              onChange={() => {
                setRegistrationData((prevState) => ({
                  ...prevState,
                  isOwner: !registrationData.isOwner,
                }));
              }}
            />
            <Checkbox
              checked={registrationData.isEmployer}
              checkboxClassName={classes.registration__checkbox}
              text="Я сотрудник"
              onChange={() => {
                setRegistrationData((prevState) => ({
                  ...prevState,
                  isEmployer: !registrationData.isEmployer,
                }));
              }}
            />
          </div>
          {error && (
            <p className={classes.registration__error}>Что-то пошло не так</p>
          )}
          <Button theme="violet" type="submit" disabled={loading}>
            Зарегистрироваться
          </Button>
          <div className={classes.registration__create}>
            <p>Уже есть личный кабинет?</p>
            <Link
              className={classes.registration__create_link}
              to={{ pathname: Routes.AUTHORIZATION }}
            >
              Войти
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
