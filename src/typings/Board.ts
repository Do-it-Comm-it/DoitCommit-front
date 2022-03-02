export interface IBoard {
  boardId?: number;
  boardTitle: string;
  boardContent: string;
  categoryId?: number;
  regDate?: Date;
  tag?: string[];
  thumbnail?: string | null;
  writer?: string;
}
