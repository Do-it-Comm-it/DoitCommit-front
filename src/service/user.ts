import { Tech } from '@src/typings/Tech';
import { IUser } from '@src/typings/User';
import { requestAPI } from '@src/utils/fetcher';
import { serialize } from 'object-to-formdata';

const getAuthUser = async () => {
  return await requestAPI().get('/auth');
};

const saveExtendedUserInfo = async (User: IUser) => {
  return await requestAPI().post('/users/save', User);
};

const getUserInfo = async () => {
  const result = await requestAPI().get('/members/info');

  if (result.nickname) {
    return {
      ...result,
      interestTechSet: result.interestTechSet
        ? result.interestTechSet.map((tech: string) => {
            return {
              value: tech,
              label: tech,
            };
          })
        : [],
    };
  }

  if (typeof result.data === 'undefined') {
    return null;
  }
  return {
    ...result.data,
    interestTechSet: result.data.interestTechSet
      ? result.data.interestTechSet.map((tech: string) => {
          return {
            value: tech,
            label: tech,
          };
        })
      : [],
  };
};

const updateUserInfo = async (user: IUser, input: any) => {
  if (input.imageFile !== '') {
    const formData = serialize({
      ...(user as IUser),
      ...input,
      interestTechSet: input.interestTechSet.map((tech: Tech) => tech.value),
    });
    const { code } = await requestAPI().put(
      '/members/update',
      formData,
      'multipart/form-data'
    );
    return code;
  } else {
    delete input.imageFile;
    const formData = serialize({
      ...(user as IUser),
      ...input,
      interestTechSet: input.interestTechSet.map((tech: Tech) => tech.value),
    });
    const { code } = await requestAPI().put(
      '/members/update',
      formData,
      'multipart/form-data'
    );
    return code;
  }
};

const resignUser = async () => {
  return await requestAPI().delete('/users/resign');
};

const logoutUser = async () => {
  const { code } = await requestAPI().post('/auth/logout');
  // if code === 1 => logout success
  return code;
};

const checkNickname = async (nickname: string) => {
  const { data } = await requestAPI().get(
    `/members/check?nickname=${nickname}`
  );
  return data;
};

const getInterestTech = async () => {
  const { data } = await requestAPI().get('/interest/tech');

  return data;
};

const userApiList = {
  getInterestTech,
  getAuthUser,
  saveExtendedUserInfo,
  getUserInfo,
  updateUserInfo,
  resignUser,
  logoutUser,
  checkNickname,
};

export default userApiList;
