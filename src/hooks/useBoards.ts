import { useRecoilValue } from 'recoil';
import { board } from '@src/service/api';
import { IBoard, IBoardList, OtherBoard } from '@src/typings/Board';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import myBoardAtom from '@src/recoil/atom/myBoard';

export const useBoards = (
  boardType: number,
  tagType?: number,
  search?: string,
  isBookmark?: boolean,
  sortType?: string
) => {
  const myBoard = useRecoilValue(myBoardAtom); // 북마크조회가 아닐때는 기본 메인 아티클을 표시한다.
  const fetchBookmarkPosts = async ({ pageParam = 0 }) => {
    const result = await board.getBookmarkBoardListByPage(
      pageParam,
      boardType,
      tagType,
      search,
      sortType
    );

    return {
      data: result.dtoList,
      nextPage: pageParam + 1,
    };
  };

  const fetchPosts = async ({ pageParam = 0 }) => {
    const result = await board.getBoardListByPage(
      pageParam,
      boardType,
      tagType,
      search,
      sortType
    );

    return {
      data: result.dtoList,
      nextPage: pageParam + 1,
    };
  };

  const fetchHistoryPosts = async ({ pageParam = 0 }) => {
    const result = await board.getHistoryBoards(
      pageParam,
      boardType,
      tagType,
      search
    );

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
  } = useInfiniteQuery(
    [
      `boards-page`,
      tagType,
      search,
      isBookmark,
      sortType,
      boardType,
      myBoard.bookmark,
      myBoard.history,
    ],
    myBoard.bookmark && !myBoard.history
      ? // 북마크 조회, 히스토리 조회 , 메인 리스트 조회
        fetchBookmarkPosts
      : !myBoard.bookmark && myBoard.history
      ? fetchHistoryPosts
      : fetchPosts,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data && lastPage.data.length !== 0) {
          return lastPage.nextPage;
        }
        return undefined;
      },
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    }
  );

  return {
    boards,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export const useBoardListMutation = (
  fieldToEdit: Partial<IBoard>,
  api: (selectedBoard: IBoard) => Promise<void>,
  category: number | null,
  search: string | null,
  isBookmark: boolean,
  isHome?: boolean,
  isPopular?: boolean
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(api, {
    onMutate: async (selectedBoard: IBoard) => {
      await queryClient.cancelQueries([
        // 홈에는 heart기능이없으니 popular와 일반 board를 나눈다.
        isPopular ? 'popular-board' : 'boards-page',
        category,
        search,
        isBookmark,
      ]);
      const snapshot = queryClient.getQueryData([
        isPopular ? 'popular-board' : 'boards-page',
        category,
        search,
      ]);
      queryClient.setQueryData<IBoardList>(
        [
          isPopular ? 'popular-board' : 'boards-page',
          category,
          search,
          isBookmark,
        ],
        (old) => ({
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
        })
      );

      // Return a snapshot so we can rollback in case of failure
      return {
        snapshot,
      };
    },
    onSuccess() {
      if (isHome) {
        queryClient.invalidateQueries('main-board');
      }
      if (isPopular) {
        queryClient.invalidateQueries('popular-board');
      } else {
        queryClient.invalidateQueries('boards-page');
      }
    },
  });

  return mutation;
};

export const useSingleBoardMutation = (
  fieldToEdit: Partial<IBoard>,
  api: any
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(api, {
    onMutate: async (selectedBoard: IBoard) => {
      await queryClient.cancelQueries(`board/${selectedBoard.boardId}`);
      const snapshot = queryClient.getQueryData(
        `board/${selectedBoard.boardId}`
      );
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

export const useDeleteBoard = () => {
  const mutation = useMutation(board.deleteBoard);
  return mutation;
};

export const useMainPageBoard = () => {
  return useQuery<Array<IBoard>>('main-board', async () => {
    return await board.getMainPageBoard();
  });
};

export const usePopularBoard = (limit: number) => {
  return useQuery<Array<IBoard>>('popular-board', async () => {
    return await board.getPopularBoard(limit);
  });
};
export const useOtherBoard = (memberId: number) => {
  return useQuery<OtherBoard>('other-board', async () => {
    return await board.getOtherBoardByMemberId(memberId);
  });
};
