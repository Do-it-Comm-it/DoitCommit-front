import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import autosize from 'autosize';
import { addComment } from '@src/service/api';

interface Props {
  boardId: number;
}
const CommentEditor = ({ boardId }: Props) => {
  const [input, setInput] = useState({
    chat: '',
    mentions: [],
  });
  const onChangeChat = useCallback(
    (e: any) => {
      const value = e.target.value;
      // regex for mentions markup in chat string
      const regex = /[^{}]+(?=})/g;
      const mentions = value.match(regex);
      setInput({
        mentions,
        chat: value,
      });
      console.log(input);
    },
    [input],
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // memberData -> 댓글 작성한 사람들 목록 { id: memberId, display: memberNickname }
  const testData = [
    {
      id: '1',
      display: '장준민',
    },
    {
      id: '2',
      display: '박수진',
    },
    {
      id: '3',
      display: '안효진',
    },
    {
      id: '4',
      display: '전예진',
    },
    {
      id: '5',
      display: '이형우',
    },
  ];
  const onSubmit = useCallback(async () => {
    const result = await addComment({
      boardId,
      content: input.chat,
      memberIdSet: input.mentions,
    });

    if (result === 1) {
      alert('댓글 등록 완료');
    }
  }, [input, boardId]);

  // render fn for suggestion list
  const renderUserSuggestion: (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean,
  ) => React.ReactNode = useCallback((member, search, highlightedDisplay, index, focus) => {
    return (
      <EachMention focus={focus}>
        <img src="https://avatars.githubusercontent.com/u/65433256?v=4" alt="user" />
        <span>{highlightedDisplay}</span>
      </EachMention>
    );
  }, []);
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  return (
    <Container>
      <Input
        allowSuggestionsAboveCursor
        value={input.chat}
        onChange={onChangeChat}
        placeholder="멋진 글에 대한 소감을 입력해보세요!"
        inputRef={textareaRef}
      >
        <Mention
          appendSpaceOnAdd
          markup="[__display__]{__id__}"
          trigger="@"
          data={testData}
          renderSuggestion={renderUserSuggestion}
          displayTransform={(id, display) => `@${display}`}
        />
      </Input>
      <Button onClick={onSubmit}>확인</Button>
    </Container>
  );
};

export default CommentEditor;

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 200px;
  border-radius: 10px;
  position: relative;
`;

const Input = styled(MentionsInput)`
  width: 100%;
  resize: none;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};

  font-weight: 350;
  font-size: 20px;
  padding: 8px 9px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.dark.a3};
    font-weight: 350;
    font-size: 20px;
  }
  & strong {
    color: ${({ theme }) => theme.colors.main};
    z-index: 1;
    position: relative;
  }
  & textarea {
    color: ${({ theme }) => theme.colors.dark.a7};
    height: 44px;
    padding: 9px 10px !important;
    outline: none !important;
    border-radius: 4px !important;
    resize: none !important;
    border: none;
  }
  & input {
    overflow: hidden;
  }
  & ul {
    max-height: 200px;
    overflow-y: auto;
    padding: 9px 10px;
    background: white;
    border-radius: 5px;
    width: 150px;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`;

const Button = styled.button`
  position: absolute;
  padding: 11px 30px;
  border-radius: 51px;
  background-color: ${({ theme }) => theme.colors.main};
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  bottom: 30px;
  right: 37px;
  border: none;
`;

export const EachMention = styled.button<{ focus: boolean }>`
  padding: 4px 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: rgb(28, 29, 28);
  width: 100%;
  & img {
    margin-right: 5px;
    width: 30px;
    height: 30px;
  }
  background-color: ${({ focus, theme }) => focus && theme.colors.main};
  color: ${({ focus, theme }) => focus && '#FFFFFF'};
`;
