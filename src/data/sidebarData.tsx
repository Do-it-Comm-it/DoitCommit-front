import React from 'react';
import MenuIcon from '@src/assets/메뉴.svg';
import CalendarIcon from '@src/assets/캘린더.svg';
import CommunityIcon from '@src/assets/커뮤니티.svg';
import MypageIcon from '@src/assets/프로필.svg';
import DoitIcon from '@src/assets/두잇.svg';
import TutorialIcon from '@src/assets/게시판.svg';
import ChallengeIcon from '@src/assets/구인공고.svg';
export const sidebarItem = [
  {
    title: '홈화면',
    icon: <MenuIcon />,
    path: '#',
  },
  {
    title: '두잇플래너',
    icon: <CalendarIcon />,
    path: '#',
  },
  {
    title: '두잇챌린지',
    icon: <ChallengeIcon />,
    path: '#',
  },
  {
    title: '튜토리얼',
    icon: <TutorialIcon />,
    path: '#',
  },
  {
    title: '커뮤니티',
    icon: <CommunityIcon />,
    path: '#',
  },

  {
    title: '마이두잇',
    icon: <DoitIcon />,
    path: '#',
  },
  {
    title: '마이페이지',
    icon: <MypageIcon />,
    path: '#',
  },
];
