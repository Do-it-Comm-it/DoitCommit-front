import { tag } from '@src/service/api';
import { Tag } from '@src/typings/Board';
import { useQuery } from 'react-query';

const useTag = () => {
  const popularTagKey = `popular-tag-list`;
  const tagListKey = `tag-list`;

  const usePopularTag = () => {
    return useQuery<Array<Tag>>(popularTagKey, async () => {
      return await tag.getPopularTags();
    });
  };

  const useTagList = () => {
    return useQuery<Array<Tag>>(tagListKey, async () => {
      return await tag.getTags();
    });
  };

  return { usePopularTag, useTagList };
};

export default useTag;
