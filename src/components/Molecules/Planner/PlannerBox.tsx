import React from 'react';
import styled from 'styled-components';
import PlannerPreview from '@src/assets/planner-preview.svg';
type PlannerBoxProps = {
  title?: string;
  participants?: string[];
  hasImage?: boolean;
};

const PlannerBox = ({ title, participants, hasImage }: PlannerBoxProps) => {
  return (
    <Wrapper>
      {hasImage ? (
        <PreviewImage />
      ) : (
        <Content>
          <Title>{title}</Title>
          {participants && <Participants>{participants.map((user) => user).toString()}</Participants>}
        </Content>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 187px;
  height: 161px;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;

  @media (max-width: ${1295}px) {
    width: 100%;
    margin: 10px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  margin-top: auto;
`;

const Title = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;

  /* #18171C */

  color: ${({ theme }) => theme.colors.dark.a7};
`;

const Participants = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.dark.a3};
`;

const PreviewImage = styled(PlannerPreview)`
  width: 100%;
  border-radius: 10px;

  min-width: 187px;
`;

export default PlannerBox;
