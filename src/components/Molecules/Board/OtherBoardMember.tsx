import React from 'react';
import styled from 'styled-components';
import ProfileIconSVG from '@src/assets/user.svg';

type Props = {
  nickname: string | null;
  memberImageUrl: string | null;
  position: string | null;
};

const OtherBoardMember = ({ nickname, memberImageUrl, position }: Props) => {
  return (
    <Container>
      {memberImageUrl ? (
        <Image src={memberImageUrl} />
      ) : (
        <ProfileIconSVG width={125} height={125} />
      )}
      <Content>
        <MemberNameWrapper>
          <MemberName>{nickname}</MemberName>
          <MemberTag>{position}</MemberTag>
        </MemberNameWrapper>

        <MemberDescription>
          {'현직 스타트업 프로덕트 디자이너로 근무하고 있습니다.'}
        </MemberDescription>
      </Content>
      <OtherBoardButton>
        <OtherBoardButtonText>글 보러가기</OtherBoardButtonText>
      </OtherBoardButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  gap: 35px;
`;
const Image = styled.img`
  min-width: 125px;
  min-height: 125px;
  max-width: 125px;
  max-height: 125px;

  border-radius: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  justify-content: center;
`;
const MemberNameWrapper = styled.div`
  display: flex;
  flex-direction: row;

  padding-bottom: 10px;
`;
const FontText = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-weight: 500;
`;

const MemberName = styled(FontText)`
  font-size: 24px;
  line-height: 38px;

  display: flex;
  align-items: center;

  /* Gray/Gray950 */

  color: ${({ theme }) => theme.colors.gray.gray950};
  padding-right: 18px;
`;
const MemberTag = styled(FontText)`
  font-size: 20px;
  line-height: 32px;
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary.default};
`;
const MemberDescription = styled.div``;
const OtherBoardButton = styled.button`
  margin: auto 0;
  min-width: 147px;
  height: 47px;

  background: ${({ theme }) => theme.colors.primary.default};
  border-radius: 50px;

  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
const OtherBoardButtonText = styled(FontText)`
  font-size: 18px;
  line-height: 25px;

  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export default OtherBoardMember;
