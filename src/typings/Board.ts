export interface IBoardList {
  pages: Array<{ data: Array<IBoard>; nextPage: number }>;
  pageParams: Array<any>;
}

export interface IBoard {
  boardId?: number;
  boardTitle: string;
  boardContent: string;
  categoryId?: number;
  regDate: string;
  boardHashtagNameList?: string[];
  thumbnailUrl?: string | null;
  writer?: string;
  writerId?: number;
  writerImageUrl?: string;
  boardCnt?: number;
  heartCnt?: number;
  myHeart?: boolean;
  myBookmark?: boolean;
  commentCnt?: number;
  modDate?: string;
}

export interface RequestBoard {
  categoryId: number;
  boardTitle: string;
  boardContent: string;
  boardHashtag: string[];
  imageForEditorRegDto: {
    allImageList: BoardImage[];
    imageList: BoardImage[];
  };
}

export interface RequestUpdateBoard {
  boardId: number;
  categoryId: number;
  boardTitle: string;
  boardContent: string;
  boardHashtag: number[];
  imageForEditorRegDto: {
    allImageList: BoardImage[];
    imageList: BoardImage[];
    deletedImageList: number[];
  };
}

export type Tag = {
  tagId: number;
  tagName: string;
};
export type BoardImage = { fileNm: string; filePath: string; url?: string };

export type OtherBoard = {
  boardOfMemberResDtoList: IBoard[];
  memberId: number;
  memberImageUrl: string | null;
  nickname: string | null;
  position: string | null;
  totalBoardCnt: number;
};
