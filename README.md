[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FDo-it-Comm-it%2FDoitCommit-front&count_bg=%23A1EF67&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

# Doit Commit 두잇 커밋 - 우리가 필요한 학습관리 웹사이트

## Purpose

- 개발 입문자들이 함께 발전가능할 수 있도록
- 효율적인 개발 학습 관리 시스템의 필요성 체감
- 개발 입문자부터 시니어 개발자까지 모두 포용 가능한 온라인 스터디 공간

## 참여자 (Frontend)

| ![](https://github.com/junmin-Chang.png) | ![](https://github.com/alexrider94.png) |
| :--------------------------------------: | :-------------------------------------: |
|                **장준민**                |               **안효진**                |

## 기술스택

| division           | stack                                                                                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Front-end          | ![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=TypeScript&colorA=gray) ![React](https://img.shields.io/badge/React-lightblue?logo=React&colorA=gray) ![](https://img.shields.io/badge/styled--components-DB7093?logo=styled-components&logoColor=white) |
| State-Management   | ![eslint](https://img.shields.io/badge/by-Recoil-blue)                                                                                                                                                                                                                   |
| Bundler & Compiler | ![](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white) ![](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)                                                                          |
| Code Management    | ![Git](https://img.shields.io/badge/Git-red?logo=Git&colorA=gray) ![github](https://img.shields.io/badge/GitHub-lightgray?logo=github&colorA=gray)                                                                                                                       |
| Formatting         | ![prettier](https://img.shields.io/badge/prettier-yellow?logo=prettier&colorA=gray)                                                                                                                                                                                      |
| Linters            | ![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)                                                                                                                                                                    |

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
