import { IUser } from '@src/typings/User';
import { user as userAPI } from '@src/service/api';
import { useQuery } from 'react-query';

export const useUser = () => {
  const user = useQuery<IUser | null>(
    'user',
    async () => {
      return await userAPI.getUserInfo().catch(() => {
        return null;
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      staleTime: 1000000,
      suspense: true,
    },
  );

  return user;
};
