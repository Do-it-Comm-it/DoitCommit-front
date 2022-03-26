export interface IBoard {
  boardId?: number;
  boardTitle: string;
  boardContent: string;
  categoryId?: number;
  regDate: string;
  boardHashtag?: string[];
  thumbnail?: string | null;
  writer?: string;
  boardCnt?: number;
}

export interface RequestBoard {
  categoryId: number;
  boardTitle: string;
  boardContent: string;
  boardHashtag: string[];
  allImageArr: BoardImage[];
  imageArr: BoardImage[];
}

export type Tag = {
  tagId: number;
  tagName: string;
};
export type BoardImage = { fileNm: string; filePath: string; url?: string };
