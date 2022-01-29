export interface IUser {
  nickname?: string | null; // 초기정보 등록 전 까진 null
  tech?: string[] | null; // 기술스택
  position?: string | null; // 직군
  pictureUrl?: string | null;
  email: string | null;
  url1?: string | null;
  url2?: string | null;
  githubUrl?: string | null;
  username?: string | null; // 아마 uuid 인듯?
}
