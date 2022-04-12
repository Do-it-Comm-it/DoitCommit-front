import { board } from '@src/service/api';
import { IBoard, IBoardList } from '@src/typings/Board';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';

export const useBoards = (boardType: number) => {
  const fetchPosts = async ({ pageParam = 0 }) => {
    const result = await board.getBoardListByPage(pageParam, boardType);
    return {
      data: result.dtoList,
      nextPage: pageParam + 1,
    };
  };

  const {
    data: boards,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('boards', fetchPosts, {
    getNextPageParam: (lastPage) => {
      if (lastPage.data.length !== 0) {
        return lastPage.nextPage;
      }
      return undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
  });

  return {
    boards,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export const useBoardListMutation = (fieldToEdit: Partial<IBoard>, api: (selectedBoard: IBoard) => Promise<void>) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(api, {
    onMutate: async (selectedBoard: IBoard) => {
      await queryClient.cancelQueries('boards');
      const snapshot = queryClient.getQueryData('boards');

      queryClient.setQueryData<IBoardList>('boards', (old) => ({
        pages: old
          ? old.pages.map((page) => ({
              ...page,
              data: page.data.map((board: IBoard) => {
                if (board.boardId === selectedBoard.boardId) {
                  return {
                    ...board,
                    ...fieldToEdit,
                  };
                } else {
                  return board;
                }
              }),
            }))
          : [],
        pageParams: old ? old.pageParams : [],
      }));

      // Return a snapshot so we can rollback in case of failure
      return {
        snapshot,
      };
    },
    onSuccess() {
      queryClient.invalidateQueries('boards');
    },
  });

  return mutation;
};

export const useSingleBoardMutation = (fieldToEdit: Partial<IBoard>, api: any) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(api, {
    onMutate: async (selectedBoard: IBoard) => {
      await queryClient.cancelQueries(`board/${selectedBoard.boardId}`);
      const snapshot = queryClient.getQueryData(`board/${selectedBoard.boardId}`);
      queryClient.setQueryData(`board/${selectedBoard.boardId}`, (old: any) => {
        return {
          ...old,
          ...fieldToEdit,
        };
      });

      return {
        snapshot,
      };
    },
    onSuccess() {
      queryClient.invalidateQueries(`board/${fieldToEdit.boardId}`);
    },
  });
  return mutation;
};
