export interface ITodos {
  todoId?: number;
  title: string;
  content: string;
  type: TodoType;
  importance: Importance;
  isFixed: boolean;
  isFinished?: boolean;
  todoDateTime?: string;
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
  GROUP = 'GROUP',
  PRIVATE = 'PRIVATE',
}

export enum Importance {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}
