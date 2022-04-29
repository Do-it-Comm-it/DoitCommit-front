import DILink from '@src/components/Atoms/DILink';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

const Header = () => {
  const location = useLocation();
  const theme = useTheme();
  const path = location.pathname.split('/')[2];

  const style: React.CSSProperties = {
    textDecoration: 'underline',
    color: theme.colors.primary.default,
  };

  return (
    <Container>
      <div>
        <DILink
          fontSize={28}
          style={path ? {} : style}
          fontWeight={500}
          to="/community"
        >
          커뮤니티
        </DILink>
        <DILink
          fontSize={28}
          style={path ? style : {}}
          fontWeight={500}
          to="/community/notice"
        >
          공지사항
        </DILink>
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
  & > div {
    display: flex;
    flex-direction: row;
    gap: 37px;
  }
`;
