import { requestAPI } from '@src/utils/fetcher';

const getPopularTags = async () => {
  const { data } = await requestAPI().get('/popularTags');
  return data;
};

const getTags = async () => {
  const { data } = await requestAPI().get('/board/tag');
  return data;
};

const tagApiList = {
  getPopularTags,
  getTags,
};

export default tagApiList;
