import CommunityBox from '@src/components/Molecules/Community/CommunityBox';
import ContentBox from '@src/components/Molecules/ContentBox';
import { useUser } from '@src/hooks/useAuthentication';
import { useMainPageBoard } from '@src/hooks/useBoards';
import React from 'react';
import styled from 'styled-components';
const Community = () => {
  const { data: MainBoards } = useMainPageBoard();
  const { data: user } = useUser();

  return (
    <ContentBox title="커뮤니티" requiredHeader>
      {MainBoards ? (
        MainBoards.map((board) => (
          <CommunityBox key={board.boardId} item={board} />
        ))
      ) : (
        <EmptyText>{user ? '비어있습니다.' : '로그인이 필요합니다.'}</EmptyText>
      )}
    </ContentBox>
  );
};

const EmptyText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 50px;
  color: ${({ theme }) => theme.colors.gray.gray500};
  font-weight: 500;
  font-size: 18px;
`;
export default Community;
