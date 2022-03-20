import { RequestBoard } from '@src/typings/Board';
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
  return {
    ...data,
    interestTechSet: data.interestTechSet.map((tech: string) => {
      return {
        value: tech,
        label: tech,
      };
    }),
  };
};

const updateUserInfo = async (user: IUser, input: any) => {
  if (input.imageFile !== '') {
    const formData = serialize({
      ...(user as IUser),
      ...input,
      interestTechSet: input.interestTechSet.map((tech: Tech) => tech.value),
    });
    const { code } = await requestAPI().put('/members/update', formData, 'multipart/form-data');
    return code;
  } else {
    delete input.imageFile;
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

const checkNickname = async (nickname: string) => {
  const { data } = await requestAPI().get(`/members/check?nickname=${nickname}`);
  return data;
};

const getTodo = async () => {
  const { data } = await requestAPI().get('/todos/main');
  return data;
};

const getTodoData = async (id: number) => {
  const { data } = await requestAPI().get(`/todos/${String(id)}`);
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
  const { code } = await requestAPI().patch(`/todos/${id}/fixed`);
  return code;
};

const finishTodo = async (id: string) => {
  const { code } = await requestAPI().patch(`/todos/${id}/finished`);
  return code;
};
const editTodo = async (id: string, body: any) => {
  const { code } = await requestAPI().put(`/todos/${id}`, body);
  return code;
};

const getBoards = async (page: number) => {
  const { data } = await requestAPI().get(`/board/list?pageNo=${page}&pageSize=16`);
  return data;
};

const getPopularTags = async () => {
  const { data } = await requestAPI().get('/popularTags');
  return data;
};

const getBoardData = async (id: string) => {
  const { data } = await requestAPI().get(`/board?boardId=${id}`);
  return data;
};

const saveBoardData = async (request: RequestBoard) => {
  const { data } = await requestAPI().post(`/board`, request);
  return data;
};

const saveImageToS3 = async (request: FormData) => {
  const { data } = await requestAPI().post(
    `/image`,
    serialize({ imageFile: request.get('file') }),
    'multipart/form-data',
  );

  return data;
};

const getComments = async (boardId: number) => {
  const { data } = await requestAPI().get(`/boards/${boardId}/comments`);
  return data;
};
const addComment = async (body: { boardId: number; content: string; memberIdSet?: any[] }) => {
  const { code } = await requestAPI().post('/comments', body);
  return code;
};
export {
  getAuthUser,
  saveExtendedUserInfo,
  getUserInfo,
  updateUserInfo,
  resignUser,
  logoutUser,
  checkNickname,
  addTodo,
  getTodo,
  getTodoData,
  deleteTodo,
  fixedTodo,
  finishTodo,
  editTodo,
  getBoards,
  getPopularTags,
  getBoardData,
  saveBoardData,
  saveImageToS3,
  addComment,
  getComments,
};
