import DIText from '@src/components/Atoms/DIText';
import LottieAnimation from '@src/components/Atoms/LottieAnimation';
import Card from '@src/components/Molecules/Board/Card';
import { useUser } from '@src/hooks/useAuthentication';
import { useBoards } from '@src/hooks/useBoards';
import { IBoard } from '@src/typings/Board';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled, { useTheme } from 'styled-components';

const NOTICE_ID = 1;

const Announcement = () => {
  const theme = useTheme();
  const { data: user } = useUser();
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const {
    boards,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useBoards(NOTICE_ID, undefined, undefined, isBookmark);

  return (
    <React.Fragment>
      {isLoading ? (
        <LottieAnimation type="loading" />
      ) : (
        <InfiniteScroll
          hasMore={hasNextPage}
          loadMore={fetchNextPage as any}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FilterContainer>
            <DIText
              fontColor={theme.colors.gray.gray950}
              fontWeight={500}
              fontSize={20}
            >
              최신 아티클을 둘러보세요
            </DIText>
            <ButtonWrapper>
              <FilterButton
                active={!isBookmark}
                onClick={() => setIsBookmark(false)}
              >
                최신
              </FilterButton>
              <FilterButton
                active={isBookmark}
                onClick={() => setIsBookmark(true)}
              >
                북마크
              </FilterButton>
            </ButtonWrapper>
          </FilterContainer>

          {isError ? (
            <LottieAnimation
              type="error"
              message={
                user
                  ? '게시글을 불러오는데 실패했습니다!'
                  : '로그인이 필요합니다'
              }
            />
          ) : (
            <Container>
              {boards?.pages.map((page) =>
                page.data?.map((b: IBoard, i: number) => (
                  <Card
                    board={b}
                    key={i}
                    category={null}
                    search={''}
                    isBookmark={isBookmark}
                  />
                ))
              )}
            </Container>
          )}
          {isFetchingNextPage && <LottieAnimation type="loading" />}
        </InfiniteScroll>
      )}
    </React.Fragment>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, max-content));
  @media (min-width: 1920px) {
    grid-template-columns: repeat(4, minmax(400px, max-content));
  }
  justify-content: center;
  row-gap: 30px;
  column-gap: 30px;
  width: 100%;
  height: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  max-width: 1700px;
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 1rem;

  & > span {
    line-height: 15px;
  }
`;
const ButtonWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
const FilterButton = styled.li<{ active: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.gray950};
  list-style: ${({ active }) => !active && 'none'};
  &::marker {
    color: ${({ theme }) => theme.colors.primary.default};
  }
`;

export default Announcement;
