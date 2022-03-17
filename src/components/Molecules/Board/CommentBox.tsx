import DIText from '@src/components/Atoms/DIText';
import useCommentRegex from '@src/hooks/useCommentRegex';
import React, { useCallback, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import CommentEditor from './CommentEditor';

interface Props {
  boardId: number;
  mentionData: { id: string; display: string }[];
  commentData: any; // 아직 필드를 정확히 모름
}
const CommentBox = ({ boardId, mentionData, commentData }: Props) => {
  const theme = useTheme();
  const [edit, setEdit] = useState(false);

  const [input, setInput] = useState({
    content: commentData.content,
    mentions: commentData.mentions,
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
            <Profile src="https://avatars.githubusercontent.com/u/65433256?v=4" alt="user_profile" />
          </Left>
          <Right>
            <Header>
              <DIText fontColor={theme.colors.dark.a7} fontWeight={350} fontSize={20}>
                월급루팡
              </DIText>
              <DIText fontColor={theme.colors.dark.a10} fontWeight={400} fontSize={16}>
                Feb.17.2022
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
