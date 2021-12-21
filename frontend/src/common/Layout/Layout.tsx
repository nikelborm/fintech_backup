import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';

import classes from './Layout.module.scss';

export interface PageComponentProps {
  layoutComponent: React.FC;
}

interface IProps {
  children?: React.ReactNode;
}

export function Layout({ children }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
