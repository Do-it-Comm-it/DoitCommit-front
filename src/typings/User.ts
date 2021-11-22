import { ITodos } from './Todos';

export interface IUser {
  isEnrolled: boolean; // 초기정보가 존재하는지, 닉네임이 null이 아닌지?
  nickname: string | null; // 초기정보 등록 전 까진 null
  todos: ITodos[] | null;
  stack: string[] | null; // 기술스택
  position: string[] | null; // 직군
}
