import { Tech } from '@src/typings/Tech';
import { AddTodo } from '@src/typings/Todos';
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
  const { data } = await requestAPI().get('/members/info');
  return data;
};

const updateUserInfo = async (user: IUser, input: any) => {
  if (input.file !== '') {
    const formData = serialize({
      ...(user as IUser),
      ...input,
      interestTechSet: input.interestTechSet.map((tech: Tech) => tech.value),
    });
    const { code } = await requestAPI().put('/members/update', formData, 'multipart/form-data');
    return code;
  } else {
    delete input.file;
    const formData = serialize({
      ...(user as IUser),
      ...input,
      interestTechSet: input.interestTechSet.map((tech: Tech) => tech.value),
    });
    const { code } = await requestAPI().put('/members/update', formData, 'multipart/form-data');
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

const getTodo = async () => {
  const { data } = await requestAPI().get('/todos/main');
  return data;
};

const addTodo = async (body: AddTodo) => {
  return await requestAPI().post('/todos', body);
};
const deleteTodo = async (id: string) => {
  const { code } = await requestAPI().delete(`/todos/${id}`);
  return code;
};
const fixedTodo = async (id: string) => {
  const { code } = await requestAPI().patch(`todos/${id}/fixed`);
  return code;
};

export {
  getAuthUser,
  saveExtendedUserInfo,
  getUserInfo,
  updateUserInfo,
  resignUser,
  logoutUser,
  addTodo,
  getTodo,
  deleteTodo,
  fixedTodo,
};
