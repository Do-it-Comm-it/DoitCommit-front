import LottieLoading from '@src/components/Atoms/LottieLoading';
import useTag from '@src/hooks/useTag';
import tag from '@src/service/tag';
import { Tag } from '@src/typings/Board';
import { devices } from '@src/utils/theme';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

type Props = {
  onChangeCategory: (tagId: number | undefined) => void;
  category?: number;
};

const Tags = ({ onChangeCategory, category }: Props) => {
  const { useLimitPopularTag, usePopularTag, useLimitPopularTag7Day } =
    useTag();
  const limit7DayData = useLimitPopularTag7Day();
  let tags; // 반환해줄 데이터
  let isLimitLoading;
  if (limit7DayData.data === undefined) {
    let limitData = useLimitPopularTag();
    tags = limitData.data;
    isLimitLoading = limitData.isLoading;
  } else {
    tags = limit7DayData.data;
  }

  // const tags = [
  //   { tagId: 1, tagName: '직장인' },
  //   { tagId: 2, tagName: '공대생' },
  //   { tagId: 3, tagName: '취준생' },
  //   { tagId: 4, tagName: '고민' },
  // ];
  if (limit7DayData.isLoading || isLimitLoading)
    //7일인기 데이터 로딩 || 전체인기 데이터 로딩
    return <LottieLoading width={50} height={30} />;
  return (
    <Container>
      <Text>인기태그</Text>
      {tags &&
        tags
          .map((tag) => (
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
          ))
          .slice(0, 7)}
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
