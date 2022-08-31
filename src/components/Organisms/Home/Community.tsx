import ContentBox from '@src/components/Molecules/ContentBox';
import React from 'react';
// import styled from 'styled-components';
const Community = () => {
  return (
    <ContentBox title="체크 두잇" requiredHeader>
      {/* TODO : 투두 리스트 기획 후 이곳에 */}
      {/* {MainBoards &&
        MainBoards.map((board) => (
          <CommunityBox key={board.boardId} item={board} />
        ))} */}
    </ContentBox>
  );
};

// const EmptyText = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 300px;
//   color: ${({ theme }) => theme.colors.gray.gray500};
//   font-weight: 500;
//   font-size: 18px;
// `;

export default Community;
