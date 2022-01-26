import { IUser } from '@src/typings/User';
import { requestAPI } from '@src/utils/fetcher';

const getAuthUser = async () => {
  return await requestAPI().get('/auth');
};

const saveExtendedUserInfo = async (User: IUser) => {
  return await requestAPI().post('/users/save', User);
};

const getUserInfo = async () => {
  return await requestAPI().get('/members/info');
};

const putUserInfo = async (User: IUser) => {
  return await requestAPI().put('/users/', User);
};

const resignUser = async () => {
  return await requestAPI().delete('/users/resign');
};

const logoutUser = async () => {
  const { code } = await requestAPI().post('/auth/logout');
  // if code === 1 => logout success
  return code;
};

export { getAuthUser, saveExtendedUserInfo, getUserInfo, putUserInfo, resignUser, logoutUser };
