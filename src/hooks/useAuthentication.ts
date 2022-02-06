import { IUser } from '@src/typings/User';
import { getUserInfo } from '@src/service/api';
import { useQuery } from 'react-query';

export const useUser = () => {
  const user = useQuery<IUser | null>(
    'user',
    async () => {
      return await getUserInfo().catch(() => {
        return null;
      });
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      staleTime: 10000,
      suspense: true,
    },
  );

  return user;
};
