import Cookies from 'universal-cookie';
import { addMonths } from 'date-fns';
import { CookieKey } from 'shared/constant/common';

const cookies = new Cookies();
export const CookiesStorage = {
  getCookieData(key: string) {
    return cookies.get(key);
  },
  setCookieData(key: string, data: string) {
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(key, data, { expires, path: '/' });
  },
  clearCookieData(key: string) {
    cookies.remove(key, { path: '/' });
  },

  getAccessToken() {
    return cookies.get(CookieKey.accessToken);
  },

  setAccessToken(accessToken: string) {
    const currentTime = new Date();
    const expires = addMonths(currentTime, 1);
    cookies.set(CookieKey.accessToken, accessToken, {
      path: '/',
      expires,
    });
  },
  clearAccessToken() {
    cookies.remove(CookieKey.accessToken);
  },

  authenticated() {
    const accessToken = cookies.get(CookieKey.accessToken);
    return accessToken !== undefined;
  },
};
