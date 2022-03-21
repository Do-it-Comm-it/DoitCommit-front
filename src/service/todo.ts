import { AddTodo } from '@src/typings/Todos';
import { requestAPI } from '@src/utils/fetcher';

const getTodoList = async () => {
  const { data } = await requestAPI().get('/todos/main');
  return data;
};

const getTodoById = async (id: number) => {
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
const fixTodo = async (id: string) => {
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

const apiList = {
  getTodoList,
  getTodoById,
  addTodo,
  deleteTodo,
  fixTodo,
  finishTodo,
  editTodo,
};

export default apiList;
