import { requestAPI } from '@src/utils/fetcher';
import { serialize } from 'object-to-formdata';

const saveImageToS3 = async (request: FormData) => {
  const { data } = await requestAPI().post(
    `/image`,
    serialize({ imageFile: request.get('file') }),
    'multipart/form-data'
  );

  return data;
};

const utilApiList = {
  saveImageToS3,
};

export default utilApiList;
