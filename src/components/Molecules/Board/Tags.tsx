import { devices } from '@src/utils/theme';
import React from 'react';
import styled from 'styled-components';

const Tags = () => {
  return (
    <Container>
      <Tag>개발자</Tag>
      <Tag>학생</Tag>
      <Tag>직장인</Tag>
      <Tag>프리랜서</Tag>
      <Tag>일상</Tag>
    </Container>
  );
};

export default Tags;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  max-width: 656px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  @media ${devices.laptop} {
    width: 100%;
  }
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 50px;
  padding: 6px 22px;
  color: ${({ theme }) => theme.colors.dark.a3};
  cursor: pointer;
  white-space: nowrap;
  margin-right: 15px;
  @media ${devices.laptop} {
    margin-top: 10px;
  }
`;
