import React from 'react';
import EmployeeIcon from '@src/assets/구인공고.svg';
import MenuIcon from '@src/assets/메뉴.svg';
import CalendarIcon from '@src/assets/캘린더.svg';
import CommunityIcon from '@src/assets/커뮤니티.svg';
import BoardIcon from '@src/assets/게시판.svg';
import CenterIcon from '@src/assets/고객센터.svg';
import SettingIcon from '@src/assets/설정.svg';
import MypageIcon from '@src/assets/프로필.svg';

export const sidebarItem = [
  {
    title: '홈화면',
    icon: <MenuIcon />,
  },
  {
    title: '구인공고',
    icon: <EmployeeIcon />,
  },
  {
    title: '마이플래너',
    icon: <CalendarIcon />,
  },
  {
    title: '투두리스트',
    icon: <MenuIcon />,
  },
  {
    title: '커뮤니티',
    icon: <CommunityIcon />,
  },
  {
    title: '게시판',
    icon: <BoardIcon />,
  },
  {
    title: '마이두잇',
    icon: <MenuIcon />,
  },
];

export const sidebarItemBottom = [
  {
    title: '문의하기',
    icon: <CenterIcon />,
  },
  {
    title: '마이페이지',
    icon: <MypageIcon />,
  },
  {
    title: '환경설정',
    icon: <SettingIcon />,
  },
];
