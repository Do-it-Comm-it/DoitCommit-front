import OtherBoardMember from '@src/components/Molecules/Board/OtherBoardMember';
import { useOtherBoard } from '@src/hooks/useBoards';
import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import BoardListItem from './BoardListItem';

type Props = {
  memberId: number;
};

const OtherBoard = ({ memberId }: Props) => {
  const { data } = useOtherBoard(memberId);

  console.log(data);

  const title = useMemo(() => {
    if (data) {
      return `작성자의 다른 글 (${data.totalBoardCnt})`;
    }
    return `작성자의 다른 글 (${0})`;
  }, [data]);

  if (data) {
    return (
      <Container>
        <OtherBoardTitle>{title}</OtherBoardTitle>
        {data.boardOfMemberResDtoList.map((board) => (
          <BoardListItem key={board.boardId} board={board} />
        ))}
        <OtherBoardMember
          nickname={data.nickname}
          memberImageUrl={data.memberImageUrl}
          position={data.position}
        />
      </Container>
    );
  }

  return (
    <Container>
      <OtherBoardTitle>{title}</OtherBoardTitle>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

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
`;

export default OtherBoard;
