import useTag from '@src/hooks/useTag';
import { devices } from '@src/utils/theme';
import React from 'react';
import styled from 'styled-components';

const Tags = () => {
  const { usePopularTag } = useTag();
  const { data: tags, isLoading } = usePopularTag();
  if (isLoading) return <p>Loading..</p>;
  return (
    <Container>
      <Text>인기태그</Text>
      {tags && tags.map((tag) => <Tag key={tag.tagId}>{tag.tagName}</Tag>).slice(0, 7)}
    </Container>
  );
};

export default Tags;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  min-width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
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

  @media ${devices.laptop} {
  }
`;
const Text = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.main};
`;
