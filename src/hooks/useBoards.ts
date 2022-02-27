import { getBoards } from '@src/service/api';
import { useInfiniteQuery } from 'react-query';

export const useBoards = () => {
  const fetchPosts = async ({ pageParam = 0 }) => {
    const result = await getBoards(pageParam);
    return {
      data: result,
      nextPage: pageParam + 1,
      totalPages: 100,
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
      if (lastPage.nextPage < lastPage.totalPages) {
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
