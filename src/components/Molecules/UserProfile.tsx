import { IUser } from '@src/typings/User';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import DIButton from '../Atoms/DIButton';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from '@src/recoil/atom/modal';
import { user as userAPI } from '@src/service/api';
import { useQueryClient } from 'react-query';
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
  const setModal = useSetRecoilState(modalAtom);
  const queryClient = useQueryClient();

  const showMenu = useCallback(() => {
    setShow(true);
  }, []);

  const onClickLogin = useCallback(() => {
    setModal({ id: 'login', visible: true });
  }, [setModal]);
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
                <MenuItem>
                  <MenuText>정보</MenuText>
                </MenuItem>
                <MenuItem>
                  <MenuText>테스트</MenuText>
                </MenuItem>
                <MenuItem>
                  <MenuText onClick={onClickLogout}>로그아웃</MenuText>
                </MenuItem>
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
  top: 20px;
  right: 0px;
  width: 60px;
  height: 120px;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const MenuItem = styled.li`
  display: block;
  width: 100%;
  height: 40px;
  padding: 3px 0;
  text-align: center;
  border-bottom: 1px solid '#000000';
`;

const MenuText = styled.a`
  font-size: 14px;
  width: 100%;
  height: 40px;
  &:hover {
    background-color: '#414141';
    cursor: pointer;
  }
`;
export default UserProfile;
