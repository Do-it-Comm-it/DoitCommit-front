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

const getLimitPopularTags7Days = async () => {
  const data = await requestAPI().get('/popularTags/limit/7Days');
  return data;
};

const tagApiList = {
  getPopularTags,
  getLimitPopularTags,
  getTags,
  getLimitPopularTags7Days,
};

export default tagApiList;
