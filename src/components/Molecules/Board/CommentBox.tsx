import DIText from '@src/components/Atoms/DIText';
import useCommentRegex from '@src/hooks/useCommentRegex';
import { IComment, IMemberTagResDto } from '@src/typings/Comment';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import CommentEditor from './CommentEditor';
import EditIconSVG from '@src/assets/filled_edit_icon.svg';
import DeleteIconSVG from '@src/assets/filled_delete_icon.svg';
import DeleteConfirmIconSVG from '@src/assets/delete_confirm.svg';
import { useUser } from '@src/hooks/useAuthentication';
import { board } from '@src/service/api';
import { useQueryClient } from 'react-query';
import useOutsideClick from '@src/hooks/useOutsideClick';
import date from '@src/utils/date';
import { FaReply } from 'react-icons/fa';

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
  const [confirm, setConfirm] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const [showReply, setShowReply] = useState<boolean>(true);

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
  const text = useCommentRegex(commentData);
  const onReply = useCallback(() => {
    setShowReply((prev) => !prev);
  }, []);

  useOutsideClick(iconRef, () => setConfirm(false));

  return (
    <Wrapper>
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
                <DIText
                  fontColor={theme.colors.gray.gray950}
                  fontWeight={350}
                  fontSize={20}
                >
                  {commentData.nickname}
                </DIText>
                <DIText
                  fontColor={theme.colors.gray.gray500}
                  fontWeight={400}
                  fontSize={16}
                >
                  {date.dateFormat(commentData.regDateTime)}
                </DIText>

                {user?.nickname === commentData.nickname ? (
                  <IconWrapper ref={iconRef}>
                    <EditIconSVG onClick={() => setEdit(true)} />
                    {confirm ? (
                      <DeleteConfirmIconSVG
                        onClick={() => onDeleteComment(commentData.commentId)}
                      />
                    ) : (
                      <DeleteIconSVG onClick={() => setConfirm(true)} />
                    )}
                  </IconWrapper>
                ) : (
                  <ReplyIcon onClick={onReply} />
                )}
              </Header>
              {!commentData.isExist ? (
                <p style={{ color: theme.colors.gray.gray500 }}>
                  삭제된 댓글입니다.
                </p>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: text }}
                  style={{ color: theme.colors.gray.gray500 }}
                ></p>
              )}
            </Right>
          </>
        )}
      </Container>
      {showReply && <ReplyBox onClose={onReply} />}
    </Wrapper>
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

const ReplyIcon = styled(FaReply)`
  margin-left: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type ReplyBoxProps = {
  onClose: () => void;
};

const ReplyBox = ({ onClose }: ReplyBoxProps) => {
  const theme = useTheme();
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [body, setBody] = useState<string>('');

  const onChangeText = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const onChangeTextAreaHeight = () => {
      if (textRef.current) {
        textRef.current.style.height = 'auto';
        textRef.current.style.height = textRef.current.scrollHeight + 'px';
      }
    };

    setBody(e.target.value);
    onChangeTextAreaHeight();
  }, []);

  return (
    <ReplyContainer>
      <TextArea ref={textRef} value={body} onChange={onChangeText} />
      <ButtonWrapper>
        <Button
          color={theme.colors.gray.gray300}
          onClick={() => {
            setBody('');
            onClose();
          }}
        >
          취소
        </Button>
        <Button onClick={() => {}}>답장</Button>
      </ButtonWrapper>
    </ReplyContainer>
  );
};

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray.gray950};
  min-height: 80px;
  max-height: 200px;
  outline: none;
  resize: none;
  border: none;
  border-radius: 10px;
  padding: 5px;
  margin: 10px 0px;
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding: 10px 0px;
`;

const Button = styled.button<{ color?: string }>`
  border: none;

  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  /* or 25px */

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  width: 94px;
  height: 47px;
  left: 941px;
  top: 163px;

  background: ${({ theme, color }) => color || theme.colors.primary.default};
  border-radius: 51px;

  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.gray100};
`;
