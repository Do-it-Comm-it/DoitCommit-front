import React from 'react';
import styled from 'styled-components';
import DILink from '@src/components/Atoms/DILink';
import ShareIconSVG from '@src/assets/share.svg';
const Header = () => {
  return (
    <Container>
      <DILink to="/mypage" fontColor="#8F9294" fontSize={28} fontWeight={500}>
        마이페이지
      </DILink>
      <DILink to="/mypage/setting" fontColor="#8F9294" fontSize={28} fontWeight={500}>
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
  border-bottom: 1px solid #eaeaea;
  padding: 30px 0;

  & > a {
    margin-left: auto;
  }
`;

const ShareIcon = styled(ShareIconSVG)`
  margin-left: auto;
  cursor: pointer;
`;
