export interface ITodos {
  id: number;
  title: string;
  isCompleted: boolean;
}

export type AddTodo = {
  title: string;
  type: string;
  content: string;
  importance: string;
  isFixed: boolean;
};
export type TodoList = ITodos[];
