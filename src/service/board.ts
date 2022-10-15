import { IBoard, RequestBoard } from '@src/typings/Board';
import { IUpdateCommentDto } from '@src/typings/Comment';
import { requestAPI } from '@src/utils/fetcher';

const getBookmarkBoardListByPage = async (
  page: number,
  boardCategoryId: number,
  tagCategoryId?: number,
  keyword?: string,
  sortType?: string
) => {
  const { data } = await requestAPI().get(
    `/bookmarks?page=${page + 1}&size=16&boardCategoryId=${
      boardCategoryId || ''
    }&tagCategoryId=${tagCategoryId || ''}
      &keyword=${keyword || ''}&sortType=${sortType || ''}
    `
  );
  return data;
};

const getBoardListByPage = async (
  page: number,
  boardCategoryId: number,
  tagCategoryId?: number,
  keyword?: string,
  sortType?: string
) => {
  const { data } = await requestAPI().get(
    `/board/list?page=${page + 1}&size=16&boardCategoryId=${
      boardCategoryId || ''
    }
    &tagCategoryId=${tagCategoryId || ''}
    &keyword=${keyword || ''}&sortType=${sortType || ''}
    `
  );
  return data;
};

const getMainPageBoard = async () => {
  const { data } = await requestAPI().get(`/board/list/main`);
  return data;
};

const getPopularBoard = async (limit: number) => {
  const { data } = await requestAPI().get(
    `/board/list/main?limit=${limit}&order=boardCnt`
  );
  return data;
};

const getBoardById = async (id: string) => {
  const { data } = await requestAPI().get(`/board?boardId=${id}`);

  console.log(data);
  return data;
};

const getOtherBoardByMemberId = async (memberId: number) => {
  const { data } = await requestAPI().get(
    `/board/members/${memberId}/limit?limit=3`
  );
  return data;
};

const saveBoard = async (request: RequestBoard) => {
  const { data } = await requestAPI().post(`/board`, request);
  return data;
};

const getCommentList = async (boardId: number, page: number, size: number) => {
  const { data } = await requestAPI().get(
    `/boards/${boardId}/comments?page=${page}&size=${size}`
  );
  return data;
};

const getHistoryBoards = async (
  page: number,
  boardCategoryId: number,
  tagCategoryId?: number,
  keyword?: string
) => {
  const { data } = await requestAPI().get(
    `/boards/history?page=${page + 1}&size=16&boardCategoryId=${
      boardCategoryId || ''
    }&tagCategoryId=${tagCategoryId || ''}
      &keyword=${keyword || ''}
    `
  );
  console.log(data);
  return data;
};

const addComment = async (body: {
  boardId: number;
  content: string;
  parentId?: number;
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
  getPopularBoard,
  getBoardById,
  saveBoard,
  getCommentList,
  addComment,
  deleteComment,
  updateComment,
  toggleHeart,
  toggleBookmark,
  getHistoryBoards,
  getOtherBoardByMemberId,
};

export default boardApiList;
