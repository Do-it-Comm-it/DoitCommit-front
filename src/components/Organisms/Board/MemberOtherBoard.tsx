import OtherBoardMember from '@src/components/Molecules/Board/OtherBoardMember';
import { useOtherBoard } from '@src/hooks/useBoards';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BoardListItem from './BoardListItem';

//TODO: get board without limit
const LIMIT = 1000;

const MemberOtherBoard = () => {
  const { memberId } = useParams();
  const { data: boardList } = useOtherBoard({
    limit: LIMIT,
    memberId:
      typeof memberId === 'string' ? parseInt(memberId) : memberId ?? null,
  });

  const title = useMemo(() => {
    if (boardList) {
      return `작성자의 다른 글 (${boardList.totalBoardCnt})`;
    }
    return `작성자의 다른 글 (${0})`;
  }, [boardList]);

  const list = useMemo(() => {
    if (boardList) {
      return boardList.boardOfMemberResDtoList;
    }
    return [];
  }, [boardList]);

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
        <OtherBoardTitle>{title}</OtherBoardTitle>

        {list.map((board) => (
          <BoardListItem board={board} />
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
