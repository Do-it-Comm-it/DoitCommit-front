import { tag } from '@src/service/api';
import { Tag } from '@src/typings/Board';
import { useQuery } from 'react-query';

const useTag = () => {
  const popularTagKey = `popular-tag-list`;
  const tagListKey = `tag-list`;
  const sevenDayPopularTagKey = `seven-day-popular-tag-list`;

  const usePopularTag = () => {
    return useQuery<Array<Tag>>(popularTagKey, async () => {
      return await tag.getPopularTags();
    });
  };

  const useLimitPopularTag = () => {
    return useQuery<Array<Tag>>(
      popularTagKey,
      async () => {
        return await tag.getLimitPopularTags();
      },
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
      }
    );
  };

  const useTagList = () => {
    return useQuery<Array<Tag>>(tagListKey, async () => {
      return await tag.getTags();
    });
  };

  const useLimitPopularTag7Day = () => {
    return useQuery<Array<Tag>>(
      sevenDayPopularTagKey,
      async () => {
        return await tag.getLimitPopularTags7Days();
      },
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
      }
    );
  };

  return {
    usePopularTag,
    useTagList,
    useLimitPopularTag,
    useLimitPopularTag7Day,
  };
};

export default useTag;
