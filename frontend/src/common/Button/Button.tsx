import React from 'react';
import cn from 'classnames';
import classes from './Button.module.scss';

export type ThemeTypes = 'violet' | 'white';
export type ButtonTypes = 'button' | 'submit' | 'reset';

interface IProps {
  type?: ButtonTypes;
  theme?: ThemeTypes;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function Button({
  type,
  theme,
  children,
  disabled = false,
  className,
  onClick,
}: IProps) {
  const ROOT_CLASS = cn(classes.button, {
    [`${className}`]: className,
    [classes[`button__${theme}`]]: theme,
  });

  return (
    <button
      type={type || 'button'}
      className={ROOT_CLASS}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
