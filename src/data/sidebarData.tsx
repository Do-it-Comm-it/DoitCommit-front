import React from 'react';
import MenuIcon from '@src/assets/menu.svg';
import CalendarIcon from '@src/assets/calander.svg';
import CommunityIcon from '@src/assets/community.svg';
import MypageIcon from '@src/assets/profile.svg';
import DoitIcon from '@src/assets/doit.svg';
import ChallengeIcon from '@src/assets/hire.svg';
export const sidebarItem = [
  {
    title: '홈화면',
    icon: <MenuIcon />,
    path: '/',
    needLogin: false,
  },
  {
    title: '두잇플래너',
    icon: <CalendarIcon />,
    path: '#',
    needLogin: true,
  },
  {
    title: '두잇챌린지',
    icon: <ChallengeIcon />,
    path: '#',
    needLogin: true,
  },
  {
    title: '커뮤니티',
    icon: <CommunityIcon />,
    path: '/community',
    needLogin: false,
  },

  {
    title: '마이두잇',
    icon: <DoitIcon />,
    path: '#',
    needLogin: false,
  },
  {
    title: '마이페이지',
    icon: <MypageIcon width={24} height={24} />,
    path: '/mypage',
    needLogin: true,
  },
];
