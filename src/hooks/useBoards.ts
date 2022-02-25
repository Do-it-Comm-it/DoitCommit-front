import { getBoards } from '@src/service/api';
import { useQuery } from 'react-query';

export const useBoards = () => {
  const boards = useQuery(
    'boards',
    async () => {
      return await getBoards().catch((err) => console.log(err));
    },
    {
      suspense: true,
    },
  );
  return boards;
};
