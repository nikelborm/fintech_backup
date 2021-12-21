import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import classes from './Popup.module.scss';

interface Props {
  title?: string;
  isOpen?: boolean;
  children?: React.ReactNode;
  onClose(): void;
}

export function Popup({
  title,
  isOpen,
  children,
  onClose,
}: Props): JSX.Element {
  const refPopup = useRef<null | HTMLDivElement>(null);

  useResetEscapeMouseClick(refPopup, onClose, 0);

  return (
    <section
      className={cn(classes.popup, { [classes.popup_opened]: isOpen })}
      ref={refPopup}
    >
      <div className={classes.popup__container}>
        <form className={classes.popup__formContainer} noValidate>
          {title && <h2 className={classes.popup__title}>{title}</h2>}
          {children}
        </form>
      </div>
    </section>
  );
}

function useResetEscapeMouseClick(
  ref: React.RefObject<HTMLDivElement>,
  update: (closeData: any) => void,
  closeData: any
) {
  useEffect(() => {
    const handleEscClose = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        update(closeData);
      }
    };
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        update(closeData);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
