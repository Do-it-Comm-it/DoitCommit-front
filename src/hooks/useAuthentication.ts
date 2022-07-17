import { IUser } from '@src/typings/User';
import { user as userAPI } from '@src/service/api';
import { useQuery } from 'react-query';

//check httpOnly cookie function
//https://stackoverflow.com/questions/9353630/check-if-httponly-cookie-exists-in-javascript

function doesHttpOnlyCookieExist(cookieName: string) {
  const d = new Date();
  d.setTime(d.getTime() + 1000);
  const expires = 'expires=' + d.toUTCString();

  document.cookie = cookieName + '=new_value;path=/;' + expires;

  return document.cookie.indexOf(cookieName + '=') === -1;
}

export const useUser = () => {
  const user = useQuery<IUser | null>(
    'user',
    async () => {
      return await userAPI.getUserInfo();
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      staleTime: 1000000,
      suspense: true,
      enabled: doesHttpOnlyCookieExist('accessToken'),
    }
  );

  return user;
};
