import { IBoard, RequestBoard } from '@src/typings/Board';
import { IUpdateCommentDto } from '@src/typings/Comment';
import { requestAPI } from '@src/utils/fetcher';

const getBookmarkBoardListByPage = async (
  page: number,
  boardCategoryId: number,
  tagCategoryId?: number,
  keyword?: string
) => {
  const { data } = await requestAPI().get(
    `/bookmarks?page=${
      page + 1
    }&size=16&boardCategoryId=${boardCategoryId}&tagCategoryId=${
      tagCategoryId || ''
    }&keyword=${keyword || ''}`
  );
  return data;
};

const getBoardListByPage = async (
  page: number,
  boardCategoryId: number,
  tagCategoryId?: number,
  keyword?: string
) => {
  const { data } = await requestAPI().get(
    `/board/list?page=${
      page + 1
    }&size=16&boardCategoryId=${boardCategoryId}&tagCategoryId=${
      tagCategoryId || ''
    }&keyword=${keyword || ''}`
  );
  return data;
};

const getMainPageBoard = async () => {
  const { data } = await requestAPI().get(`/board/list/main`);
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
  const { data } = await requestAPI().get(
    `/boards/${boardId}/comments?page=${page}`
  );
  return data;
};

const addComment = async (body: {
  boardId: number;
  content: string;
  memberIdSet?: any[];
}) => {
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

const toggleHeart = async (selectedBoard: IBoard) => {
  switch (selectedBoard.myHeart) {
    case false:
      await requestAPI().post(`/boards/${selectedBoard.boardId}/hearts`);
      break;
    case true:
      await requestAPI().delete(`/boards/${selectedBoard.boardId}/hearts`);
      break;
  }
};
const toggleBookmark = async (selectedBoard: IBoard) => {
  switch (selectedBoard.myBookmark) {
    case false:
      await requestAPI().post(`/boards/${selectedBoard.boardId}/bookmarks`);
      break;
    case true:
      await requestAPI().delete(`/boards/${selectedBoard.boardId}/bookmarks`);
      break;
  }
};
const boardApiList = {
  getBookmarkBoardListByPage,
  getBoardListByPage,
  getMainPageBoard,
  getBoardById,
  saveBoard,
  getCommentList,
  addComment,
  deleteComment,
  updateComment,
  toggleHeart,
  toggleBookmark,
};

export default boardApiList;
