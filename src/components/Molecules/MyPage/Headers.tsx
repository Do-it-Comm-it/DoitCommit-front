import React, { useMemo } from 'react';
import styled from 'styled-components';
import DILink from '@src/components/Atoms/DILink';
import { useLocation } from 'react-router-dom';

type MyPageMenu = 'mypage' | 'system';

const Header = () => {
  const location = useLocation();
  const activeMenu: MyPageMenu = useMemo(() => {
    const pathName = location.pathname;

    if (pathName.includes('setting')) {
      return 'system';
    } else {
      return 'mypage';
    }
  }, [location]);

  return (
    <Container>
      <DILink to="/mypage/info" fontSize={28} active={activeMenu === 'mypage'}>
        마이페이지
      </DILink>
      <DILink
        to="/mypage/setting"
        fontSize={28}
        active={activeMenu === 'system'}
      >
        시스템설정
      </DILink>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.sub.gary100};
  padding: 45px 0;
  gap: 35px;
`;
