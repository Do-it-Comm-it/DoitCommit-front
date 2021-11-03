# Git Branch

- `master` : 커밋 금지, 최종 배포용
- `develop` : 각자 개발 후 병합하는 브랜치
- `feature/` : 기능 개발 브랜치

# Folder Structure

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
