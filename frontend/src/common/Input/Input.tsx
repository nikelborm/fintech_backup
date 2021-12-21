import React from 'react';

import classes from './Input.module.scss';

export interface IPropsInput {
  label: string;
  className?: string;
  value?: string | null;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  uniquenessError?: boolean;
  uniquenessErrorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  type,
  className,
  value,
  error = true,
  uniquenessError = true,
  uniquenessErrorMessage,
  errorMessage,
  required = true,
  ...attr
}: IPropsInput) {
  return (
    <div
      className={
        className ? `${classes.input} ${className}` : `${classes.input}`
      }
    >
      <input
        className={classes.input__item}
        type={type || 'text'}
        value={value || ''}
        required={required}
        {...attr}
      />
      <label className={classes.input__label} htmlFor="input">
        {label}
      </label>
      {!error && (
        <p className={classes.input__error}>
          {errorMessage || 'Введите корректное значение'}
        </p>
      )}
      {!uniquenessError && (
        <p className={classes.input__error}>{uniquenessErrorMessage}</p>
      )}
    </div>
  );
}
