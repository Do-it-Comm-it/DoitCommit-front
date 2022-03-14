import { saveImageToS3 } from '@src/service/api';
import { useQuery } from 'react-query';
import { useUser } from './useAuthentication';

const useImage = (file: string) => {
  const { data: user } = useUser();

  const result = useQuery<string>(
    'todo',
    () => {
      return saveImageToS3(file);
    },
    {
      enabled: user ? true : false,
    },
  );

  return result;
};

export { useImage };
