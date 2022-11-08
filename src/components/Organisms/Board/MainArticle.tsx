import DIText from '@src/components/Atoms/DIText';
import LottieAnimation from '@src/components/Atoms/LottieAnimation';
import Card from '@src/components/Molecules/Board/Card';
import { useUser } from '@src/hooks/useAuthentication';
import { useBoards } from '@src/hooks/useBoards';
import useOutsideClick from '@src/hooks/useOutsideClick';
import { filterNumber, filterString } from '@src/utils/board';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled, { useTheme } from 'styled-components';
import OpenerSVG from '@src/assets/opener.svg';
import { IBoard } from '@src/typings/Board';
import { useRecoilState, useRecoilValue } from 'recoil';
import myBoardAtom from '@src/recoil/atom/myBoard';
import { searchAtom } from '@src/recoil/atom/search';
type Props = {
  search?: string;
  tagType?: number;
};

const MainArticle = ({ tagType, search }: Props) => {
  const theme = useTheme();
  const { data: user } = useUser();
  const [isBookmark, setIsBookmark] = useState<boolean>(false);
  const [isOpener, setIsOpener] = useState<boolean>(false);
  const [filterBoard, setFilterBoard] = useState<string>('최신순');
  const [filterPosition, setFilterPosition] = useState<string>('전체'); // 개발,디자인,기획
  const [myBoard, setMyBoard] = useRecoilState(myBoardAtom);
  const isSearch = useRecoilValue(searchAtom);
  const filterRef = useRef<HTMLUListElement>(null);

  useOutsideClick(filterRef, () => setIsOpener(false));

  const { boards, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useBoards(
      filterNumber(filterPosition),
      tagType,
      search,
      isBookmark,
      filterString(filterBoard)
    );

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
      {(myBoard.bookmark || myBoard.history) && !isSearch.complete && !isError && (
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
                  <ButtonWrapper ref={filterRef}>
                    <FilterButton
                      active={!isBookmark}
                      isClick={true}
                      onClick={() => {
                        setIsBookmark(false);
                        setIsOpener((prev) => !prev);
                      }}
                    >
                      {filterBoard}
                    </FilterButton>
                    <FilterOpener
                      isOpener={isOpener}
                      onClick={() => {
                        setIsOpener((prev) => !prev);
                      }}
                    />
                    {isOpener && (
                      <FilterWrap>
                        {['최신순', '좋아요순', '조회수순'].map(
                          (FBoard: string) => (
                            <Filter
                              key={FBoard}
                              isSelect={FBoard === filterBoard}
                              onClick={() => {
                                setFilterBoard(FBoard);
                                setIsOpener(false);
                              }}
                            >
                              {FBoard}
                            </Filter>
                          )
                        )}
                      </FilterWrap>
                    )}
                  </ButtonWrapper>
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
          {!isError && (
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
                <ButtonWrapper ref={filterRef}>
                  <FilterButton
                    active={!isBookmark}
                    isClick={true}
                    onClick={() => {
                      setIsBookmark(false);
                      setIsOpener((prev) => !prev);
                    }}
                  >
                    {filterBoard}
                  </FilterButton>
                  <FilterOpener
                    isOpener={isOpener}
                    onClick={() => {
                      setIsOpener((prev) => !prev);
                    }}
                  />
                  {isOpener && (
                    <FilterWrap>
                      {['최신순', '좋아요순', '조회수순'].map(
                        (FBoard: string) => (
                          <Filter
                            key={FBoard}
                            isSelect={FBoard === filterBoard}
                            onClick={() => {
                              setFilterBoard(FBoard);
                              setIsOpener(false);
                            }}
                          >
                            {FBoard}
                          </Filter>
                        )
                      )}
                    </FilterWrap>
                  )}
                </ButtonWrapper>
              )}
              {myBoard.bookmark && !myBoard.history && (
                // 클릭 효과를 없앤다.
                <FilterButton active={true} isClick={false}>
                  {filterBoard}
                </FilterButton>
              )}
            </FilterContainer>
          )}
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
const ButtonWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const FilterButton = styled.li<{ active?: boolean; isClick?: boolean }>`
  color: ${({ theme }) => theme.colors.gray.gray950};
  list-style: ${({ active }) => !active && 'none'};
  &::marker {
    color: ${({ theme }) => theme.colors.primary.default};
  }
  cursor: ${({ isClick }) => (!isClick ? 'auto' : 'pointer')};
`;

const FilterOpener = styled(({ isOpener, ...props }) => (
  <OpenerSVG {...props} />
))<{ isOpener?: boolean }>`
  & > path {
    stroke: ${({ theme }) => theme.colors.primary.default};
  }
  cursor: pointer;
  ${({ isOpener }) =>
    isOpener ? `transform: rotate(-180deg)` : `transform: rotate(0deg)`};
`;

const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30px;
  right: 0;
  left: 8;
`;

const Filter = styled.button<{ isSelect: boolean }>`
  width: 108px;
  height: 49px;
  background: ${({ isSelect }) => (isSelect ? '#F9F9F9' : '#FEFEFE')};
  border: 1px solid transparent;
  color: ${({ theme, isSelect }) =>
    isSelect ? theme.colors.primary.default : theme.colors.gray.gray950};
  cursor: pointer;
  &:first-child {
    border-radius: 10px 10px 0px 0px;
  }
  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }
  z-index: 2;
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
