import { useEffect, useState, useCallback, useRef } from 'react';
import Cookies from 'js-cookie';

export function useCookieValue(key: string) {
  const storageItem = Cookies.get(key);

  const [cookieValue, setCookieValue] =
    useState<string | undefined>(storageItem);

  const timeoutIdLink = useRef<number | undefined>();

  const setLocalItem = useCallback(() => {
    setTimeout(() => {
      const itemValueFromStorage = Cookies.get(key);
      setCookieValue(itemValueFromStorage);
    }, 50);
  }, [key, setCookieValue]);

  useEffect(() => {
    document.addEventListener('cookieChange', setLocalItem, false);

    return () => {
      clearTimeout(timeoutIdLink.current);
      document.removeEventListener('cookieChange', setLocalItem);
    };
  });
  function refetchCookie() {
    const event = new Event('cookieChange');
    document.dispatchEvent(event);
  }

  useEffect(() => {
    setCookieValue(storageItem);
    refetchCookie();
  }, [storageItem]);

  function deleteCookie() {
    const event = new Event('cookieChange');
    document.dispatchEvent(event);
    Cookies.remove(key);
  }

  return {
    refetchCookie,
    deleteCookie,
    cookieValue,
  };
}
