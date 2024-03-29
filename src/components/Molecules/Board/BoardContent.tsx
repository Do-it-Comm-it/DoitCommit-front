import { IBoard } from '@src/typings/Board';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import CommentBox from './CommentBox';
import CommentEditor from './CommentEditor';
import useComments from '@src/hooks/useComments';
import { IComment, ICommentRes } from '@src/typings/Comment';
import CommentIconSVG from '@src/assets/comment.svg';
import ShowMoreText from '@src/components/Atoms/ShowMoreText';
import { useUser } from '@src/hooks/useAuthentication';
import { useDeleteBoard } from '@src/hooks/useBoards';
import { useNavigate } from 'react-router';
import ConfirmModal from '@src/components/Organisms/Modal/ConfirmModal';

interface Props {
  boardData: IBoard;
}
const BoardContent = ({ boardData }: Props) => {
  const { comments, isLoading, fetchNextPage, hasNextPage } = useComments(
    boardData.boardId!
  );
  const [showConfirm, setShowConfirm] = useState(false);
  const { data: user } = useUser();
  const { mutate } = useDeleteBoard();
  const navigate = useNavigate();

  //TODO: check my board by userId or email
  const isMyBoard = boardData.writer === user?.nickname;

  const getComputedExtraPage = useCallback(
    (
      page: {
        commentsData: ICommentRes;
        nextPage: number;
      }[]
    ) => {
      if (page[0].commentsData.parentCommentCnt >= 3 * (page.length + 1)) {
        return 3;
      }
      return page[0].commentsData.parentCommentCnt % 3;
    },
    []
  );

  const onDeleteBoard = useCallback(async () => {
    if (boardData.boardId) {
      mutate(boardData.boardId, {
        onSuccess: () => {
          navigate('/community');
        },
      });
    } else {
    }
  }, [boardData.boardId, mutate, navigate]);

  const onShowConfirm = useCallback(() => {
    setShowConfirm(true);
  }, []);

  const onEditBoard = useCallback(() => {
    navigate(`/community/edit/`, { state: { boardData } });
  }, [boardData, navigate]);

  return (
    <Container>
      <Content>
        <div dangerouslySetInnerHTML={{ __html: boardData.boardContent }} />
      </Content>
      {isMyBoard ? (
        <ButtonWrapper>
          <DeleteButton onClick={onShowConfirm}>삭제</DeleteButton>
          <EditButton onClick={onEditBoard}>수정</EditButton>
        </ButtonWrapper>
      ) : null}
      <CommentCountWrapper>
        <CommentIconSVG />
        <TotalText>{comments?.pages[0].commentsData.totalCommentCnt}</TotalText>
      </CommentCountWrapper>

      {!isLoading &&
        comments?.pages.map(({ commentsData }) =>
          commentsData.commentResDtoList.dtoList.map((c: IComment) => (
            <CommentBox
              key={c.commentId}
              boardId={boardData.boardId!}
              mentionData={commentsData.memberTagResDtoList}
              commentData={c}
              commentParentId={c.commentId}
              depth={0}
              childLength={c.childList.length}
            />
          ))
        )}
      {hasNextPage && (
        <ShowMoreText
          onClick={() => fetchNextPage()}
          length={getComputedExtraPage(comments?.pages!)}
        />
      )}
      {!isLoading && (
        <CommentEditor
          mentionData={
            comments?.pages[0].commentsData.memberTagResDtoList || []
          }
          boardId={boardData.boardId!}
        />
      )}
      {showConfirm && (
        <ConfirmModal
          title="게시글 삭제"
          content="게시글을 삭제하시겠습니까?"
          onConfirm={onDeleteBoard}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </Container>
  );
};

export default BoardContent;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 200px;
  & > div {
    color: ${({ theme }) => theme.colors.black};
    & > * {
      color: ${({ theme }) => theme.colors.gray.gray500};
      font-weight: 400;
    }
    & > p {
      color: ${({ theme }) => theme.colors.gray.gray500};
      font-weight: 400;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: ${({ theme }) => theme.colors.gray.gray950};
      margin: 1.2rem 0;
    }
    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
  }
`;

const CommentCountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  gap: 5px;
`;

const TotalText = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
  font-weight: 400;
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 30%;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 15px;
  margin-left: auto;
`;

const CirCleButton = styled.button`
  width: 95px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 50px;
`;

const EditButton = styled(CirCleButton)`
  border: 1px solid ${({ theme }) => theme.colors.primary.default};

  background-color: ${({ theme }) => theme.colors.primary.default};
  color: ${({ theme }) => theme.colors.white};
`;

const DeleteButton = styled(CirCleButton)`
  border: 1px solid ${({ theme }) => theme.colors.warning};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.warning};
  cursor: pointer;
`;
