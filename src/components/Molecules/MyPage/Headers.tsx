import React from 'react';
import styled from 'styled-components';
import DILink from '@src/components/Atoms/DILink';
import ShareIconSVG from '@src/assets/share.svg';
const Header = () => {
  return (
    <Container>
      <DILink to="/mypage" fontSize={28} fontWeight={500} activeStyle={{ color: '#476CFF' }}>
        마이페이지
      </DILink>
      <DILink to="/mypage/setting" fontSize={28} fontWeight={500} activeStyle={{ color: '#476CFF' }}>
        환경 설정
      </DILink>
      <ShareIcon />
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark.a2};
  padding: 30px 0;

  & > a {
    margin-left: auto;
  }
`;

const ShareIcon = styled(ShareIconSVG)`
  margin-left: auto;
  cursor: pointer;
  & > path {
    fill: ${({ theme }) => theme.colors.dark.a7};
  }
`;
