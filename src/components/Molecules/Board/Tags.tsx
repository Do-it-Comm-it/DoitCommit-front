import LottieAnimation from '@src/components/Atoms/LottieAnimation';
import useTag from '@src/hooks/useTag';
import { devices } from '@src/utils/theme';
import React from 'react';
import styled from 'styled-components';

type Props = {
  onChangeCategory: (tagId: number | undefined) => void;
  category?: number;
};

const Tags = ({ onChangeCategory, category }: Props) => {
  const { useLimitPopularTag } = useTag();
  const { data: tags, isLoading } = useLimitPopularTag();
  if (isLoading)
    return <LottieAnimation type="loading" width={50} height={30} />;
  return (
    <Container>
      <Text>인기태그</Text>
      {tags &&
        tags.map((tag) => (
          <Tag
            isActive={category ? category === tag.tagId : false}
            key={tag.tagId}
            onClick={() => {
              if (category === tag.tagId) {
                onChangeCategory(undefined);
              } else {
                onChangeCategory(tag.tagId);
              }
            }}
          >
            {tag.tagName}
          </Tag>
        ))}
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

const Tag = styled.div<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.success : theme.colors.gray.gray100};
  border-radius: 50px;
  padding: 6px 22px;
  color: ${({ theme }) => theme.colors.gray.gray400};
  cursor: pointer;
  white-space: nowrap;

  @media ${devices.laptop} {
  }
`;
const Text = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.primary.default};
`;
