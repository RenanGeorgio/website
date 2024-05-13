import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useAcceptCookies(cookieName = 'accept_cookies') {
    const [acceptedCookies, setAcceptedCookies] = useState<boolean>(true);
  
    useEffect(() => {
      if (!Cookies.get(cookieName)) {
        setAcceptedCookies(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const acceptCookies = () => {
      setAcceptedCookies(true);
      Cookies.set(cookieName, 'accepted', { expires: 365 })
    }
  
    return {
      acceptedCookies,
      onAcceptCookies: acceptCookies,
    }
}