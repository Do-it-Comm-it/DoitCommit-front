export interface ITodos {
  todoId?: number;
  title: string;
  content: string;
  type: TodoType;
  importance: string;
  isFixed: boolean;
  isFinished?: boolean;
  todoDateTime?: Date;
}

export type AddTodo = {
  title: string;
  type: string;
  content: string;
  importance: string;
  isFixed: boolean;
};
export type TodoList = ITodos[];

export enum TodoType {
  'STUDY' = 'STUDY',
  'DAILY' = 'DAILY',
  'WORK' = 'WORK',
}
