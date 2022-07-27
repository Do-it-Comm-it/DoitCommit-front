import { board } from '@src/service/api';
import { ICommentRes } from '@src/typings/Comment';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

export const useReplyComment = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation(board.addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(`comments/${boardId}`);
    },
    onError: () => {
      alert('error occurred during reply comment');
      queryClient.invalidateQueries(`comments/${boardId}`);
    },
  });
};

const useComments = (boardId: number) => {
  const fetchComments = async ({ pageParam = 1 }) => {
    const result: ICommentRes = await board.getCommentList(boardId, pageParam);
    return {
      commentsData: result,
      nextPage: pageParam + 1,
    };
  };
  const {
    data: comments,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(`comments/${boardId}`, fetchComments, {
    getNextPageParam: (lastPage) => {
      if (
        lastPage.nextPage <= lastPage.commentsData.commentResDtoList.totalPage
      ) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return {
    comments,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useComments;
