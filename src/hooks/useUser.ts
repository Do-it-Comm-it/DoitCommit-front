import { useQuery } from 'react-query';
import { user as userAPI } from '@src/service/api';

export const useUserInterestTech = () => {
  return useQuery('user-interest', userAPI.getInterestTech);
};
