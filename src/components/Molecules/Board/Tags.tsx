import useTag from '@src/hooks/useTag';
import { devices } from '@src/utils/theme';
import React from 'react';
import styled from 'styled-components';

const Tags = () => {
  const { usePopularTag } = useTag();
  const { data: tags, isLoading } = usePopularTag();
  if (isLoading) return <p>Loading..</p>;
  return <Container>{tags && tags.map((tag) => <Tag key={tag.value}>{tag.label}</Tag>).slice(0, 7)}</Container>;
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
  margin-top: 7px;

  @media ${devices.laptop} {
    margin-top: 10px;
  }
`;
