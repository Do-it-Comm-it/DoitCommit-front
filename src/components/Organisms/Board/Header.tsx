import DILink from '@src/components/Atoms/DILink';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import SearchBar from '../../Molecules/Board/SearchBar';
import Tags from '../../Molecules/Board/Tags';

const Header = () => {
  const theme = useTheme();
  return (
    <Container>
      <div>
        <DILink
          fontSize={28}
          fontWeight={500}
          style={{
            display: 'block',
          }}
          activeStyle={{
            color: theme.colors.main,
            borderBottom: `2px solid ${theme.colors.main}`,
            paddingBottom: '5px',
          }}
          to="/community"
        >
          커뮤니티
        </DILink>
        <DILink
          fontSize={28}
          fontWeight={500}
          style={{
            display: 'block',
          }}
          activeStyle={{
            color: theme.colors.main,
            borderBottom: `2px solid ${theme.colors.main}`,
            paddingBottom: '5px',
          }}
          to="/community/announcement"
        >
          공지사항
        </DILink>
      </div>

      <SearchBar />
      <Tags />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 250px;
  align-items: center;
  justify-content: space-evenly;

  & > div {
    display: flex;
    flex-direction: row;
    & > * {
      margin-right: 40px;
    }
  }
`;
