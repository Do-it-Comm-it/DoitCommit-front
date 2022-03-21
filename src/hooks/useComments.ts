import { board } from '@src/service/api';
import { ICommentRes } from '@src/typings/Comment';
import { useQuery } from 'react-query';

const useComments = (boardId: number) => {
  const result = useQuery<ICommentRes>(
    `comments/${boardId}`,
    async () => {
      return await board.getCommentList(boardId);
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  );

  return result;
};

export default useComments;
