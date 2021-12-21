import React from 'react';
import { Input } from 'common/Input/Input';
import { RestaurantCard } from './components/RestaurantCard/RestaurantCard';
import Patari from '../../../assets/icons/Patari.png';
import classes from './AccountCustomer.module.scss';

export function AccountCustomer() {
  const mok = [
    { id: 1, img: Patari, title: 'Патари', rating: 4 },
    { id: 2, img: Patari, title: 'Патари', rating: 4 },
    { id: 3, img: Patari, title: 'Патари', rating: 1 },
    { id: 4, img: Patari, title: 'Патари', rating: 2 },
  ];

  return (
    <div>
      <h1>все заведения</h1>
      <Input label="search" />
      <div className={classes.customer__cardList}>
        {mok.map((item) => (
          <RestaurantCard
            img={item.img}
            key={item.id}
            title={item.title}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
}
