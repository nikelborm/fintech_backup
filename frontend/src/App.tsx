import { Route, Switch } from 'react-router';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { routes } from './routes';

import classes from './App.module.scss';
import { useEffect, useState } from 'react';

export default function App() {
  return (
    <div className={classes.app}>
      <div className={classes.app__content}>
        <Switch>
          {Object.keys(routes).map((key) => {
            const { Component, ...rest } = routes[key];
            return <Route key={key} {...rest} render={() => <Component />} />;
          })}
        </Switch>
      </div>
    </div>
  );
}
