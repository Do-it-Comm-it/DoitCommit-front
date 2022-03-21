import { util } from '@src/service/api';
import { useMutation } from 'react-query';

const useImage = () => {
  return useMutation((file: FormData) => util.saveImageToS3(file));
};

export { useImage };
