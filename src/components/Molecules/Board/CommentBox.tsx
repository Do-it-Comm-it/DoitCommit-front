import DIText from '@src/components/Atoms/DIText';
import useCommentRegex from '@src/hooks/useCommentRegex';
import { IComment, IMemberTagResDto } from '@src/typings/Comment';
import React, { useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import CommentEditor from './CommentEditor';

interface Props {
  boardId: number;
  mentionData: IMemberTagResDto[];
  commentData: IComment;
}
const CommentBox = ({ boardId, mentionData, commentData }: Props) => {
  const theme = useTheme();
  const [edit, setEdit] = useState(false);

  const [input, setInput] = useState({
    content: commentData.content,
    mentions: commentData.memberIdSet,
  });
  const text = useCommentRegex(input);
  const onToggle = useCallback(() => {
    setEdit((value) => !value);
  }, []);

  return (
    <Container>
      {edit ? (
        <>
          <button onClick={onToggle}>취소</button>
          <CommentEditor boardId={boardId} mentionData={mentionData} defaultValue={input} />
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
              <button onClick={onToggle}>수정</button>
            </Header>
            <p dangerouslySetInnerHTML={{ __html: text }}></p>
          </Right>
        </>
      )}
    </Container>
  );
};

export default CommentBox;

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
