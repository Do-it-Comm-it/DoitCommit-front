import { useOtherBoard } from '@src/hooks/useBoards';
import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';

type Props = {
  memberId: number;
};

const OtherBoard = ({ memberId }: Props) => {
  const { data } = useOtherBoard(memberId);

  console.log(data);

  const title = useMemo(() => {
    return `작성자의 다른 글 ${0}`;
  }, []);

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
