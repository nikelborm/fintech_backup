import React from 'react';

import { Button } from 'common/Button/Button';
import classes from './RestaurantCard.module.scss';
import StarRating from 'common/StarRating/StarRating';

interface IProps {
  img: string;
  title: string;
  rating: number;
}

export function RestaurantCard({ title, rating, img }: IProps) {
  return (
    <div className={classes.card}>
      <div>
        <img src={img} alt="img" />
      </div>
      <div className={classes.card__content}>
        <div className={classes.card__description}>
          <h4>{title}</h4>
          <div>
            <StarRating rateCount={rating} />
          </div>
        </div>
        <Button className={classes.card__button}>Оставить чаевые</Button>
      </div>
    </div>
  );
}
