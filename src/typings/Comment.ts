export interface ICommentRes {
  totalCommentCnt: number;
  parentCommentCnt: number;
  memberTagResDtoList: IMemberTagResDto[];
  commentResDtoList: ICommentResDto;
}

export interface ICommentResDto {
  page: number;
  size: number;
  totalPage: number;
  dtoList: IComment[];
}
export interface IComment {
  commentId: number;
  content: string;
  imageUrl: string;
  isExist: boolean;
  memberIdSet: string[];
  nickname: string;
  regDateTime: string;
  writerId: string;
  childList: IComment[];
}

export interface IMemberTagResDto {
  id: string;
  display: string;
  imageUrl: string;
}

export interface IUpdateCommentDto {
  body: {
    content: string;
    commentId: number;
    memberIdSet?: string[];
  };
}
