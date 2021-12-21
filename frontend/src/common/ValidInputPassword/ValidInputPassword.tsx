import React from 'react';
import { CheckedIcon } from '../../assets/icons';
import { Input } from '../Input/Input';

import classes from './ValidInputPassword.module.scss';

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  validStatePassword: boolean;
  label: string;
}

export function ValidInputPassword({
  onChange,
  password,
  validStatePassword,
  label,
}: IProps) {
  return (
    <>
      <div className={classes.input__password}>
        <Input
          autoComplete="password"
          label={label}
          value={password}
          type="password"
          onChange={(e) => {
            onChange(e);
          }}
        />
        {!validStatePassword && (
          <p className={classes.input__password_notFilled}>
            {password.trim().length
              ? 'Введите корректный пароль'
              : 'Придумайте пароль'}
          </p>
        )}
        {
          <div className={classes.input__tooltip}>
            <ul className={classes.input__list}>
              Требования к паролю:
              {password.length < 8 ? (
                <li className={classes.input__listItem}>
                  <CheckedIcon />8 и более символов
                </li>
              ) : (
                <li className={classes.input__listItem_active}>
                  <CheckedIcon />8 и более символов
                </li>
              )}
              {!/(?=.*[a-z])(?=.*[A-Z])+/.test(password) ? (
                <li className={classes.input__listItem}>
                  <CheckedIcon /> Прописные и строчные латинские буквы
                </li>
              ) : (
                <li className={classes.input__listItem_active}>
                  <CheckedIcon /> Прописные и строчные латинские буквы
                </li>
              )}
              {!/[\d]+/.test(password) ? (
                <li className={classes.input__listItem}>
                  <CheckedIcon /> Хотя бы одна цифра
                </li>
              ) : (
                <li className={classes.input__listItem_active}>
                  <CheckedIcon /> Хотя бы одна цифра
                </li>
              )}
            </ul>
            {/[^A-Za-z0-9]/.test(password) && (
              <p>Пароль содержит недопустимые символы</p>
            )}
          </div>
        }
      </div>
    </>
  );
}
