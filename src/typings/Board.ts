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
