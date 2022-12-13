import BoardFilterSelector from '@src/components/Molecules/Board/BoardFilterSelector';
import OtherBoardMember from '@src/components/Molecules/Board/OtherBoardMember';
import { useOtherBoard } from '@src/hooks/useBoards';
import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BoardListItem from './BoardListItem';

//TODO: get board without limit
const LIMIT = 1000;

const MemberOtherBoard = () => {
  const [filterBoard, setFilterBoard] = useState<string>('최신순');
  const { memberId } = useParams();
  const { data: boardList } = useOtherBoard({
    limit: LIMIT,
    memberId:
      typeof memberId === 'string' ? parseInt(memberId) : memberId ?? null,
  });

  const onChangeFilter = useCallback((filterBoard: string) => {
    setFilterBoard(filterBoard);
  }, []);

  const title = useMemo(() => {
    if (boardList) {
      return `작성자의 다른 글 (${boardList.totalBoardCnt})`;
    }
    return `작성자의 다른 글 (${0})`;
  }, [boardList]);

  console.log(boardList?.boardOfMemberResDtoList);
  const list = useMemo(() => {
    if (boardList) {
      if (filterBoard === '조회순') {
        return boardList.boardOfMemberResDtoList.sort((a, b) => {
          return b.boardCnt ?? 0 - (a.boardCnt ?? 0);
        });
      } else if (filterBoard === '좋아요순') {
        return boardList.boardOfMemberResDtoList.sort((a, b) => {
          return b.heartCnt ?? 0 - (a.heartCnt ?? 0);
        });
      } else {
        return boardList.boardOfMemberResDtoList;
      }
    }
    return [];
  }, [boardList, filterBoard]);

  return (
    <Container>
      {boardList ? (
        <OtherBoardMember
          memberId={boardList.memberId}
          memberImageUrl={boardList.memberImageUrl}
          nickname={boardList.nickname}
          position={boardList.position}
          isAlarmButton
        />
      ) : null}
      <Wrapper>
        <Header>
          <OtherBoardTitle>{title}</OtherBoardTitle>
          <BoardFilterSelector
            active={true}
            filter={filterBoard}
            onChangeFilter={onChangeFilter}
          />
        </Header>

        {list.map((board) => (
          <BoardListItem board={board} key={board.boardId} />
        ))}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  gap: 32px;
`;

const OtherBoardTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 39px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.primary.default};
  padding: 40px 0px;
`;

export default MemberOtherBoard;
