import { requestAPI } from '@src/utils/fetcher';

const getPopularTags = async () => {
  const { data } = await requestAPI().get('/popularTags');
  return data;
};

const getLimitPopularTags = async () => {
  const { data } = await requestAPI().get('/popularTags/limit');
  return data;
};

const getTags = async () => {
  const { data } = await requestAPI().get('/board/tag');
  return data;
};

const tagApiList = {
  getPopularTags,
  getLimitPopularTags,
  getTags,
};

export default tagApiList;
