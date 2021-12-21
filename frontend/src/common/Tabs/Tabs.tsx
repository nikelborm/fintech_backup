import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

import classes from './Tabs.module.scss';

interface Tab {
  id: number;
  to: string;
  text: string;
}

type Tabs = Tab | null;

interface Props {
  tabsOptions: Tabs[];
}

export function Tabs({ tabsOptions }: Props): JSX.Element {
  const { path } = useRouteMatch();

  return (
    <div className={classes.tabs}>
      <ul className={classes.tabs__list}>
        {tabsOptions?.map(
          (tab) =>
            tab && (
              <li key={tab?.id} className={classes.tabs__item}>
                <NavLink
                  className={classes.tabs__link}
                  activeClassName={classes.tabs__link_selected}
                  to={`${path}/${tab?.to}`}
                >
                  {tab?.text}
                </NavLink>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
