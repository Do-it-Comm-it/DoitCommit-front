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

const putUserInfo = async (User: IUser) => {
  return await requestAPI().put('/users/', User);
};

const resignUser = async (User: IUser) => {
  return await requestAPI().delete('/users/resign', User);
};

export { getAuthUser, saveExtendedUserInfo, getUserInfo, putUserInfo, resignUser };
