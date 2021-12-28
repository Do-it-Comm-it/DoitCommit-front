import { IUser } from '@src/typings/User';
import { requestAPI } from '@src/utils/fetcher';

const getAuthUser = async (token: string): Promise<{ user: IUser }> => {
  return await requestAPI(token).get('/auth');
};

const saveExtendedUserInfo = async (token: string, User: IUser) => {
  return await requestAPI(token).post('/user/save', User);
};

export { getAuthUser, saveExtendedUserInfo };
