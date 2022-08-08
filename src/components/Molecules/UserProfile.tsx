import { IUser } from '@src/typings/User';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import DIButton from '../Atoms/DIButton';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import { user as userAPI } from '@src/service/api';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

type UserProfileProps = {
  width?: number;
  height?: number;
  user: IUser | null;
  isMenuEnable?: boolean;
  src?: string;
};

//TODO: It needs profile default image if user image is empty.
const UserProfile = ({
  width = 40,
  height = 40,
  user,
  isMenuEnable = false,
  src,
}: UserProfileProps) => {
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const setModal = useSetRecoilState(modalAtom);
  const queryClient = useQueryClient();

  const showMenu = useCallback(() => {
    setShow(true);
  }, []);

  const onClickLogin = useCallback(() => {
    setModal({ id: 'login', visible: true });
  }, [setModal]);

  const onClickMyPage = useCallback(
    (e) => {
      e.stopPropagation();
      setShow(false);
      navigate('/mypage/info');
    },
    [navigate]
  );

  const onClickSystem = useCallback(
    (e) => {
      e.stopPropagation();
      setShow(false);
      navigate('/mypage/setting');
    },
    [navigate]
  );

  const onClickLogout = useCallback(async () => {
    try {
      if (await userAPI.logoutUser()) {
        queryClient
          .getQueryCache()
          .findAll('user')
          .forEach((query) => query.setData(null));
        queryClient.removeQueries('user');
        queryClient.removeQueries('main-board');
        queryClient.removeQueries('boards-page');
      }
    } catch (err) {
      console.log(err);
    }
  }, [queryClient]);

  if (isMenuEnable) {
    return (
      <>
        {user === null ? (
          <DIButton width={80} height={30} onClick={onClickLogin}>
            로그인
          </DIButton>
        ) : (
          <Circle
            tabIndex={0}
            width={width}
            height={height}
            onBlur={() => {
              setShow(false);
            }}
            onClick={() => {
              showMenu();
            }}
          >
            {user && (
              <ProfileImage
                src={src || user.pictureUrl!}
                width={width}
                height={height}
                alt={'connection error'}
              />
            )}

            {show && (
              <Menu>
                <MenuItem onClick={onClickMyPage}>마이페이지</MenuItem>
                <MenuItem onClick={onClickSystem}>시스템 설정</MenuItem>
                <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
              </Menu>
            )}
          </Circle>
        )}
      </>
    );
  } else {
    return (
      <Circle tabIndex={0} width={width} height={height}>
        {user && (
          <ProfileImage
            src={src || user?.pictureUrl!}
            width={width}
            height={height}
            alt={'connection error'}
          />
        )}
      </Circle>
    );
  }
};

const Circle = styled.div<{ width: number; height: number }>`
  position: relative;
  display: inline-block;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;
const ProfileImage = styled.img`
  border-radius: 10px;
`;

const Menu = styled.div`
  display: block;
  position: absolute;
  top: 40px;
  right: 0px;
  width: 150px;
  height: 132px;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const MenuItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  background: ${({ theme }) => theme.colors.gray.gray100};
  font-family: ${({ theme }) => theme.font.NotoSansKRLight};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;

  &:first-child {
    border-radius: 10px 10px 0px 0px;
  }

  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default UserProfile;
