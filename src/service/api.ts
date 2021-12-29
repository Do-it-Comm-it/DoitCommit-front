import { IUser } from '@src/typings/User';
import { requestAPI } from '@src/utils/fetcher';

const getAuthUser = async (token: string) => {
  return await requestAPI(token).get('/auth');
};

const saveExtendedUserInfo = async (User: IUser) => {
  return await requestAPI().post('/users/save', User);
};

const getUserInfo = async (User: IUser) => {
  return await requestAPI().post('/users/me', User);
};

export { getAuthUser, saveExtendedUserInfo, getUserInfo };
