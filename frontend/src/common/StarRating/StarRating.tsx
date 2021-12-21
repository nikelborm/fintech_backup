import React from 'react';
import { FilledStarIcon } from '../../assets/icons';
import classes from './StarRating.module.scss';

interface IProps {
  rateCount: number;
}

export default function StarRating({ rateCount }: IProps) {
  return (
    <div className={classes.star__wrapper}>
      <FilledStarIcon className={classes.star} />
      {rateCount}
    </div>
  );
}
