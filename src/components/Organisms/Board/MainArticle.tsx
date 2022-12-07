import DIText from '@src/components/Atoms/DIText';
import LottieAnimation from '@src/components/Atoms/LottieAnimation';
import Card from '@src/components/Molecules/Board/Card';
import { useUser } from '@src/hooks/useAuthentication';
import { useBoards } from '@src/hooks/useBoards';
import { filterNumber, filterString } from '@src/utils/board';
import React, { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled, { useTheme } from 'styled-components';

import { IBoard } from '@src/typings/Board';
import { useRecoilState, useRecoilValue } from 'recoil';
import myBoardAtom from '@src/recoil/atom/myBoard';
import { searchAtom } from '@src/recoil/atom/search';
import BoardFilterSelector from '@src/components/Molecules/Board/BoardFilterSelector';
type Props = {
  search?: string;
  tagType?: number;
};

const MainArticle = ({ tagType, search }: Props) => {
  const theme = useTheme();
  const { data: user } = useUser();
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [filterBoard, setFilterBoard] = useState<string>('최신순');
  const [filterPosition, setFilterPosition] = useState<string>('전체'); // 개발,디자인,기획
  const [myBoard, setMyBoard] = useRecoilState(myBoardAtom);
  const isSearch = useRecoilValue(searchAtom);

  const { boards, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useBoards(
      filterNumber(filterPosition),
      tagType,
      search,
      isBookmark,
      filterString(filterBoard)
    );

  const onChangeFilter = useCallback((filterBoard: string) => {
    setFilterBoard(filterBoard);
  }, []);

  const onChangeBookmark = useCallback((isBookmark: boolean) => {
    setIsBookmark(isBookmark);
  }, []);

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={fetchNextPage as any}
      style={{
        width: '100%',
        maxWidth: 1700,
        height: '100%',
      }}
    >
      {(myBoard.bookmark || myBoard.history) && !isSearch.complete && (
        <Flex>
          <SelectList
            active={myBoard.bookmark}
            onClick={() => {
              setMyBoard({ bookmark: true, history: false });
            }}
          >
            북마크
          </SelectList>
          <SelectList
            active={myBoard.history}
            onClick={() => {
              setMyBoard({ bookmark: false, history: true });
            }}
          >
            히스토리
          </SelectList>
        </Flex>
      )}
      {isSearch.complete ? (
        <>
          {
            /*
            - 필터옵션이 보이지 않는경우 만약 검색을 하였을때, data가 없으면 필터옵션을 숨겨준다.
            - 필터옵션이 보이는 경우
            1. data가 존재하고
            2. 해당 data를 필터링하다 data가 없으면 필터링옵션이 숨김처리되는것을 방지하여
            3. 필터포지션 기본값이 아닐때만 필터옵션을 보이도록 처리하였음.
            */
            (boards?.pages[0].data.length > 0 || filterPosition !== '전체') && (
              <FilterContainer>
                <FilterPositionWrap>
                  {['전체', '기획', '개발', '디자인'].map(
                    (pos: string, index: number) => (
                      <FilterPositionList
                        key={pos}
                        active={filterPosition === pos}
                        onClick={() => {
                          setFilterPosition(pos);
                        }}
                      >
                        {pos}
                      </FilterPositionList>
                    )
                  )}
                </FilterPositionWrap>
                {!myBoard.bookmark && !myBoard.history && (
                  <BoardFilterSelector
                    filter={filterBoard}
                    active={!isBookmark}
                    onChangeBookmark={onChangeBookmark}
                    onChangeFilter={onChangeFilter}
                  />
                )}
                {myBoard.bookmark && !myBoard.history && (
                  // 클릭 효과를 없앤다.
                  <FilterButton active={true} isClick={false}>
                    {filterBoard}
                  </FilterButton>
                )}
              </FilterContainer>
            )
          }
        </>
      ) : (
        <>
          {!myBoard.bookmark && !myBoard.history && (
            <DIText
              fontColor={theme.colors.gray.gray950}
              fontWeight={700}
              fontSize={24}
            >
              최신 아티클을 둘러보세요
            </DIText>
          )}
          {
            <FilterContainer>
              <FilterPositionWrap>
                {['전체', '기획', '개발', '디자인'].map(
                  (pos: string, index: number) => (
                    <FilterPositionList
                      key={pos}
                      active={filterPosition === pos}
                      onClick={() => {
                        setFilterPosition(pos);
                      }}
                    >
                      {pos}
                    </FilterPositionList>
                  )
                )}
              </FilterPositionWrap>
              {!myBoard.bookmark && !myBoard.history && (
                <BoardFilterSelector
                  filter={filterBoard}
                  active={!isBookmark}
                  onChangeBookmark={onChangeBookmark}
                  onChangeFilter={onChangeFilter}
                />
              )}
              {myBoard.bookmark && !myBoard.history && (
                // 클릭 효과를 없앤다.
                <FilterButton active={true} isClick={false}>
                  {filterBoard}
                </FilterButton>
              )}
            </FilterContainer>
          }
        </>
      )}

      {isError ? (
        <LottieAnimation
          type="error"
          message={
            user ? '게시글을 불러오는데 실패했습니다!' : '로그인이 필요합니다'
          }
        />
      ) : (
        <React.Fragment>
          {boards?.pages[0].data.length === 0 ? (
            <LottieAnimation
              type="empty"
              message={
                isBookmark
                  ? '해당 북마크 게시글은 찾을 수 없습니다'
                  : isSearch.complete && filterPosition === '전체'
                  ? '해당 검색어와 관련된 게시글은 찾을 수 없습니다'
                  : filterPosition !== '전체'
                  ? '해당 분야와 관련된 게시글은 찾을 수 없습니다'
                  : null
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
        </React.Fragment>
      )}
      {isFetchingNextPage && <LottieAnimation type="loading" />}
    </InfiniteScroll>
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
  /* max-width: 800px; */
  flex-direction: row;
  margin-top: 1rem;
  margin-bottom: 1rem;

  & > span {
    line-height: 15px;
  }
`;
const FilterButton = styled.li<{ active?: boolean; isClick?: boolean }>`
  color: ${({ theme }) => theme.colors.gray.gray950};
  list-style: ${({ active }) => !active && 'none'};
  &::marker {
    color: ${({ theme }) => theme.colors.primary.default};
  }
  cursor: ${({ isClick }) => (!isClick ? 'auto' : 'pointer')};
`;

const FilterPositionWrap = styled.ul`
  display: flex;
  align-items: center;
`;

const FilterPositionList = styled.li<{ active: boolean }>`
  list-style: none;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary.default : theme.colors.gray.gray400};
  &:not(first-child) {
    margin-left: 8px;
    cursor: pointer;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 66px;
`;

const SelectList = styled.div<{ active?: boolean }>`
  margin: 0 30px;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary.default : theme.colors.gray.gray950};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  text-underline-offset: ${({ active }) => (active ? '5px' : 'none')};
`;

export default MainArticle;
