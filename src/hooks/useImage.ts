import { saveImageToS3 } from '@src/service/api';
import { useMutation } from 'react-query';
const useImage = () => {
  return useMutation((file: FormData) => saveImageToS3(file));
};

export { useImage };
