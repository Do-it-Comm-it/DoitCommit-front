import Card from '@src/components/Molecules/Board/Card';
import React, { useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { useBoards } from '@src/hooks/useBoards';
import { IBoard } from '@src/typings/Board';
import DIText from '@src/components/Atoms/DIText';
import LottieLoading from '@src/components/Atoms/LottieLoading';
import SearchBar from '@src/components/Molecules/Board/SearchBar';
import Tags from '@src/components/Molecules/Board/Tags';
import { useDebounce } from '@src/hooks/useDebounce';
import { useUser } from '@src/hooks/useAuthentication';
import LottieEmptyOrError from '@src/components/Atoms/LottieEmptyOrError';

const COMMUNITY_ID = 2;

const CardContainer = () => {
  const theme = useTheme();
  const { data: user } = useUser();
  const [category, setCategory] = useState<number>();
  const [search, setSearch] = useState<string>();
  const debouncedKeyword = useDebounce(search, 250);
  const [isBookmark, setIsBookmark] = useState<boolean>(false);

  const {
    boards,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useBoards(COMMUNITY_ID, category, debouncedKeyword || '', isBookmark);

  const onChangeCategory = useCallback((categoryId) => {
    setCategory(categoryId);
  }, []);

  const onChangeSearch = useCallback((search) => {
    setSearch(search);
  }, []);

  return (
    <React.Fragment>
      <HeaderContainer>
        <SearchBar onChangeSearch={onChangeSearch} />
        <Tags onChangeCategory={onChangeCategory} category={category} />
      </HeaderContainer>
      {isLoading ? (
        <LottieLoading />
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
            <LottieEmptyOrError
              type="error"
              message={
                user
                  ? '게시글을 불러오는데 실패했습니다!'
                  : '로그인이 필요합니다'
              }
            />
          ) : (
            <React.Fragment>
              {boards?.pages[0].data.length === 0 ? (
                <LottieEmptyOrError
                  type="empty"
                  message={
                    isBookmark
                      ? '해당 북마크 게시글은 찾을 수 없습니다'
                      : '해당 태그에 관련된 게시글은 찾을 수 없습니다'
                  }
                />
              ) : (
                <Container>
                  {boards?.pages.map((page) =>
                    page.data?.map((b: IBoard, i: number) => (
                      <Card
                        board={b}
                        key={i}
                        category={category || null}
                        search={search || ''}
                        isBookmark={isBookmark}
                      />
                    ))
                  )}
                </Container>
              )}
            </React.Fragment>
          )}
          {isFetchingNextPage && <LottieLoading />}
        </InfiniteScroll>
      )}
    </React.Fragment>
  );
};

export default CardContainer;

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
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding-bottom: 30px;
  width: 100%;
  height: 100%;
`;
const FilterContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  max-width: 800px;
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
