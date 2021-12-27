import { ITodos } from './Todos';

export interface IUser {
  nickname: string | null; // 초기정보 등록 전 까진 null
  todos?: ITodos[] | null;
  tech: string[] | null; // 기술스택
  position: string | null; // 직군
  image: string | null;
  email: string | null;
  url1: string | null;
  url2: string | null;
  githubUrl: string | null;
}
