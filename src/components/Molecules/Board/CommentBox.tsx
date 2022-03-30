import DIText from '@src/components/Atoms/DIText';
import useCommentRegex from '@src/hooks/useCommentRegex';
import { IComment, IMemberTagResDto } from '@src/typings/Comment';
import React, { useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import CommentEditor from './CommentEditor';
import EditIconSVG from '@src/assets/filled_edit_icon.svg';
import DeleteIconSVG from '@src/assets/filled_delete_icon.svg';
import { useUser } from '@src/hooks/useAuthentication';
import { board } from '@src/service/api';
import { useQueryClient } from 'react-query';

interface Props {
  boardId: number;
  mentionData: IMemberTagResDto[];
  commentData: IComment;
}
const CommentBox = ({ boardId, mentionData, commentData }: Props) => {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [edit, setEdit] = useState(false);

  const onDeleteComment = useCallback(
    async (commentId: number) => {
      await board.deleteComment(commentId);
      queryClient.invalidateQueries(`comments/${boardId}`);
    },
    [boardId, queryClient],
  );
  const onToggle = useCallback((value) => {
    setEdit(value);
  }, []);
  const text = useCommentRegex(commentData);

  return (
    <Container>
      {edit ? (
        <>
          <CommentEditor
            boardId={boardId}
            mentionData={mentionData}
            defaultValue={commentData}
            onToggle={onToggle}
            commentId={commentData.commentId}
          />
        </>
      ) : (
        <>
          <Left>
            <Profile src={commentData.imageUrl} alt="user_profile" />
          </Left>
          <Right>
            <Header>
              <DIText fontColor={theme.colors.dark.a7} fontWeight={350} fontSize={20}>
                {commentData.nickname}
              </DIText>
              <DIText fontColor={theme.colors.dark.a10} fontWeight={400} fontSize={16}>
                {commentData.regDateTime}
              </DIText>
              {user?.nickname === commentData.nickname && (
                <IconWrapper>
                  <EditIconSVG onClick={() => setEdit(true)} />
                  <DeleteIconSVG onClick={() => onDeleteComment(commentData.commentId)} />
                </IconWrapper>
              )}
            </Header>
            {!commentData.isExist ? (
              <p style={{ color: theme.colors.dark.a10 }}>삭제된 댓글입니다.</p>
            ) : (
              <p dangerouslySetInnerHTML={{ __html: text }} style={{ color: theme.colors.dark.a10 }}></p>
            )}
          </Right>
        </>
      )}
    </Container>
  );
};

export default React.memo(CommentBox);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-top: 1px solid #e0e1e4;
  padding: 44px 0;
`;

const Profile = styled.img`
  width: 69px;
  height: 69px;
  border-radius: 10px;
`;
const Right = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Left = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
`;

const IconWrapper = styled.div`
  & > svg {
    cursor: pointer;
  }
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-left: auto;
`;
