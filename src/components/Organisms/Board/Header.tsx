import DILink from '@src/components/Atoms/DILink';
import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <div>
        <DILink fontSize={28} fontWeight={500} to="/community">
          커뮤니티
        </DILink>
        <DILink fontSize={28} fontWeight={500} to="/community/notice">
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
  height: 150px;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
  & > div {
    display: flex;
    flex-direction: row;
    gap: 37px;
  }
`;
