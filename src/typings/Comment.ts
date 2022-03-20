export interface ICommentRes {
  commentCount: number;
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
  imageResDto: {
    filePath: string;
    fileNm: string;
  };
  isExist: boolean;
  memberIdSet: string[];
  nickname: string;
  regDateTime: string;
  writerId: string;
}

export interface IMemberTagResDto {
  id: string;
  display: string;
}
