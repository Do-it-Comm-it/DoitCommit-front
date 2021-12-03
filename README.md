# Git Branch

- `master` : 커밋 금지, 최종 배포용
- `develop` : 각자 개발 후 병합하는 브랜치
- `feature/` : 기능 개발 브랜치

---

# Folder Structure

- `src/`
  - `hooks/` : 훅
  - `components/` : 컴포넌트 폴더
    - `${컴포넌트 이름}/`
      - `index.tsx`
      - `styles.tsx` : 컴포넌트 스타일
  - `utils/` : 유틸함수 폴더
  - `pages/` : 페이지 폴더
    - `${페이지 이름}/`
      - `index.tsx`
      - `styles.tsx`
  - `layouts/` : 레이아웃 폴더
    - `${레이아웃 이름}/`
      - `index.tsx`
      - `styles.tsx`
  - `typings/` : 각종 타입 폴더
- `client.tsx` : 엔티티 파일

---

# Scripts

`npm run dev` : 개발 서버 시작
`npm run build` : 프로덕션 빌드

# path

- 절대경로 설정해놓음 import시
  `import from '@src/...'`


# Library

- react-icon reference

  `https://react-icons.github.io/react-icons/icons?name=ai`