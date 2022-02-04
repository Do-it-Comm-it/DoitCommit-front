import React from 'react';
import styled from 'styled-components';

type PlannerBoxProps = {
  title: string;
  participants: string[];
};

const PlannerBox = ({ title, participants }: PlannerBoxProps) => {
  return (
    <Wrapper>
      <Content>
        <Title>{title}</Title>
        <Participants>{participants.map((user) => user).toString()}</Participants>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 187px;
  height: 161px;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;

  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
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

  color: ${({ theme }) => theme.colors.dark.a5};
`;

const Participants = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: ${({ theme }) => theme.colors.dark.a2};
`;

export default PlannerBox;
