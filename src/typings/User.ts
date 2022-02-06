import { Tech } from './Tech';

export interface IUser {
  nickname?: string | null; // 초기정보 등록 전 까진 null
  interestTechSet?: Tech[] | null; // 기술스택
  position?: string | null; // 직군
  pictureUrl?: string | null;
  email: string | null;
  url1?: string | null;
  url2?: string | null;
  githubUrl?: string | null;
  regDate?: Date;
}
