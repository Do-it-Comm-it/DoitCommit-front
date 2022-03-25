import { RequestBoard } from '@src/typings/Board';
import { IUpdateCommentDto } from '@src/typings/Comment';
import { requestAPI } from '@src/utils/fetcher';

const getBoardListByPage = async (page: number) => {
  const { data } = await requestAPI().get(`/board/list?pageNo=${page}&pageSize=16`);
  return data;
};

const getBoardById = async (id: string) => {
  const { data } = await requestAPI().get(`/board?boardId=${id}`);
  return data;
};

const saveBoard = async (request: RequestBoard) => {
  const { data } = await requestAPI().post(`/board`, request);
  return data;
};

const getCommentList = async (boardId: number, page: number) => {
  const { data } = await requestAPI().get(`/boards/${boardId}/comments?page=${page}`);
  return data;
};

const addComment = async (body: { boardId: number; content: string; memberIdSet?: any[] }) => {
  const { code } = await requestAPI().post('/comments', body);
  return code;
};

const deleteComment = async (commentId: number) => {
  const { code } = await requestAPI().patch(`/comments/${commentId}/isExist`);
  return code;
};
const updateComment = async ({ body }: IUpdateCommentDto) => {
  const { code } = await requestAPI().put(`/comments/${body.commentId}`, body);
  return code;
};

const boardApiList = {
  getBoardListByPage,
  getBoardById,
  saveBoard,
  getCommentList,
  addComment,
  deleteComment,
  updateComment,
};

export default boardApiList;
