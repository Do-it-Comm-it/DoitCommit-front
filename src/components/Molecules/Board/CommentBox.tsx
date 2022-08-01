import DIText from '@src/components/Atoms/DIText';
import useCommentRegex from '@src/hooks/useCommentRegex';
import { IComment, IMemberTagResDto } from '@src/typings/Comment';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import CommentEditor, { CommentType } from './CommentEditor';
import DeleteIconSVG from '@src/assets/filled_delete_icon.svg';
import DeleteConfirmIconSVG from '@src/assets/delete_confirm.svg';
import CountReplyIconSVG from '@src/assets/count-reply.svg';
import { useUser } from '@src/hooks/useAuthentication';
import { board } from '@src/service/api';
import { useQueryClient } from 'react-query';
import useOutsideClick from '@src/hooks/useOutsideClick';
import date from '@src/utils/date';
import { FaReply } from 'react-icons/fa';
import { useReplyComment } from '@src/hooks/useComments';

interface Props {
  boardId: number;
  mentionData: IMemberTagResDto[];
  commentData: IComment;
  depth: number;
  commentParentId?: number;
  childLength?: number;
}

const CommentBox = ({
  commentParentId,
  boardId,
  mentionData,
  commentData,
  depth,
  childLength,
}: Props) => {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [showReply, setShowReply] = useState<boolean>(false);
  const text = useCommentRegex(commentData);
  const { mutate: onReplyComment } = useReplyComment(boardId);

  const onDeleteComment = useCallback(
    async (commentId: number) => {
      await board.deleteComment(commentId);
      queryClient.invalidateQueries(`comments/${boardId}`);
    },
    [boardId, queryClient]
  );

  const onToggle = useCallback((value) => {
    setEdit(value);
  }, []);

  const onOpenReply = useCallback((isOpen: boolean) => {
    setShowReply(isOpen);
  }, []);

  const onReply = useCallback(
    ({ parentId, content, mentions }: CommentType) => {
      onReplyComment(
        {
          boardId,
          content,
          parentId,
          memberIdSet: mentions,
        },
        {
          onSuccess: () => {
            setShowReply(false);
          },
        }
      );
    },
    [boardId, onReplyComment]
  );

  useOutsideClick(iconRef, () => setConfirm(false));

  return (
    <Wrapper>
      <Container childDepth={depth}>
        {edit ? (
          <CommentEditor
            boardId={boardId}
            mentionData={mentionData}
            defaultValue={commentData}
            onToggle={onToggle}
            commentId={commentData.commentId}
          />
        ) : (
          <>
            <ProfileSide>
              <Profile src={commentData.imageUrl} alt="user_profile" />
            </ProfileSide>
            <CommentSide>
              <Header>
                <Nickname>{commentData.nickname}</Nickname>
                <DateText>{date.dateFormat(commentData.regDateTime)}</DateText>

                {user?.nickname === commentData.nickname ? (
                  <IconWrapper ref={iconRef}>
                    {confirm ? (
                      <DeleteConfirmIconSVG
                        onClick={() => onDeleteComment(commentData.commentId)}
                      />
                    ) : (
                      <DeleteIconSVG onClick={() => setConfirm(true)} />
                    )}
                  </IconWrapper>
                ) : null}
              </Header>
              {commentData.isExist ? (
                <Content dangerouslySetInnerHTML={{ __html: text }} />
              ) : (
                <Content>삭제된 댓글입니다.</Content>
              )}
              <BottomWrapper>
                <ReplyText onClick={() => onOpenReply(true)}>
                  답글달기
                </ReplyText>
                {user?.nickname === commentData.nickname ? (
                  <EditText onClick={() => setEdit(true)}>수정하기</EditText>
                ) : null}
                {childLength ? (
                  <ReplyCount>
                    <CountReplyIconSVG />
                    {childLength}
                  </ReplyCount>
                ) : null}
              </BottomWrapper>
            </CommentSide>
          </>
        )}
      </Container>
      {showReply && (
        <CommentEditor
          boardId={boardId}
          mentionData={mentionData}
          defaultValue={commentData}
          onToggle={onOpenReply}
          onReply={onReply}
          commentId={commentParentId}
        />
      )}
      {commentData.childList && commentData.childList.length
        ? commentData.childList.map((comment) => (
            <CommentBox
              key={comment.commentId}
              boardId={boardId}
              commentData={comment}
              mentionData={mentionData}
              depth={depth + 1}
              commentParentId={commentParentId}
            />
          ))
        : null}
    </Wrapper>
  );
};

export default React.memo(CommentBox);

const Container = styled.div<{ childDepth?: number }>`
  display: flex;
  flex-direction: row;
  width: ${({ childDepth }) =>
    childDepth ? `calc(100% - ${childDepth * 80})` : `100%`};
  border-top: 1px solid #e0e1e4;
  padding: 40px 0px;
  margin-left: ${({ childDepth }) => (childDepth ? childDepth * 80 : 0)}px;
`;

const Profile = styled.img`
  width: 69px;
  height: 69px;
  border-radius: 10px;
`;

const CommentSide = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileSide = styled.div`
  display: flex;
  width: 30%;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  width: 100%;
  gap: 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-left: auto;
  & > svg {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.p`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  color: ${({ theme }) => theme.colors.gray.gray500};

  padding-top: 10px;
  padding-bottom: 25px;
  font-size: 16px;
  line-height: 140%;

  word-wrap: break-word;
`;

const Nickname = styled(DIText)`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 160%;

  color: ${({ theme }) => theme.colors.gray.gray950};
`;

const DateText = styled(DIText)`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  /* or 22px */

  /* Gray/Gray500 */

  color: ${({ theme }) => theme.colors.gray.gray500};
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  gap: 24px;
`;

const BottomText = styled(DIText)`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  cursor: pointer;
`;

const ReplyText = styled(BottomText)`
  color: ${({ theme }) => theme.colors.primary.default};
`;

const EditText = styled(BottomText)`
  color: ${({ theme }) => theme.colors.gray.gray500};
`;

const ReplyCount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;
