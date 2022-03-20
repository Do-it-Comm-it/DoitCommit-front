export interface IBoard {
  boardId?: number;
  boardTitle: string;
  boardContent: string;
  categoryId?: number;
  regDate: string;
  tag?: string[];
  thumbnail?: string | null;
  writer?: string;
  boardCnt?: number;
}

export interface RequestBoard {
  categoryId: number;
  boardTitle: string;
  boardContent: string;
  tag: string[];
  allImageArr: BoardImage[];
  imageArr: BoardImage[];
}

export type Tag = {
  value: number;
  label: string;
};
export type BoardImage = { fileNm: string; filePath: string; url?: string };
