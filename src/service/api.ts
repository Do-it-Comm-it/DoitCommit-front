import { IUser } from '@src/typings/User';
import { requestAPI } from '@src/utils/fetcher';

const getAuthUser = async () => {
  return await requestAPI().get('/auth');
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

const resignUser = async () => {
  return await requestAPI().delete('/users/resign');
};

export { getAuthUser, saveExtendedUserInfo, getUserInfo, putUserInfo, resignUser };
