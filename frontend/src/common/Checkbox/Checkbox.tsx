import React from 'react';
import cn from 'classnames';

import classes from './Checkbox.module.scss';

interface IProps {
  checked: boolean;
  checkboxClassName?: string;
  text?: string;
  readOnly?: boolean;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Checkbox({
  checkboxClassName,
  text,
  checked,
  readOnly,
  onChange,
}: IProps) {
  const className = cn(`${classes.checkbox__wrapper}`, checkboxClassName);
  return (
    <div
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange && onChange();
      }}
    >
      <label className={classes.checkbox}>
        <input
          type="checkbox"
          onChange={onChange}
          readOnly={readOnly}
          checked={checked}
        />
        <span className={classes.checkbox__checkmark} />
      </label>
      <span className={classes.checkbox__text}>{text}</span>
    </div>
  );
}
