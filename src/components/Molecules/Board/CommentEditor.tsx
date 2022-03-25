import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import autosize from 'autosize';
import { board } from '@src/service/api';
import { IComment, IMemberTagResDto } from '@src/typings/Comment';
import { useQueryClient } from 'react-query';

interface Props {
  boardId: number;
  commentId?: number;
  mentionData: IMemberTagResDto[];
  defaultValue?: IComment;

  onToggle?: (value: boolean) => void;
}
const CommentEditor = ({ defaultValue, boardId, mentionData, onToggle, commentId }: Props) => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState({
    content: defaultValue?.content ?? '',
    mentions: defaultValue?.memberIdSet ?? [],
  });
  const onChangeChat = useCallback((e: any) => {
    const value = e.target.value;
    // regex for mentions markup in chat string
    const regex = /[^{}]+(?=})/g;
    const mentions = value.match(regex);
    setInput({
      mentions,
      content: value,
    });
  }, []);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = useCallback(async () => {
    //defaultValue가 존재하면 즉 수정할 때는 수정 api 아니면 생성 api 호출 (분기)
    if (onToggle && commentId) {
      const result = await board.updateComment({
        body: {
          commentId,
          content: input.content,
          memberIdSet: input.mentions,
        },
      });
      if (result === 1) {
        onToggle(false);
        queryClient.invalidateQueries(`comments/${boardId}`);
      }
    } else {
      const result = await board.addComment({
        boardId,
        content: input.content,
        memberIdSet: input.mentions ?? [],
      });

      if (result === 1) {
        queryClient.invalidateQueries(`comments/${boardId}`);
      }
    }
  }, [input, boardId, queryClient, onToggle, commentId]);

  // render fn for suggestion list
  const renderUserSuggestion: (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean,
  ) => React.ReactNode = useCallback(
    (member, search, highlightedDisplay, index, focus) => {
      return (
        <EachMention focus={focus}>
          <img src={mentionData[index].imageUrl} alt="user" />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [mentionData],
  );
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, [input]);

  return (
    <Container>
      {onToggle && (
        <ImageContainer>
          <img src={defaultValue?.imageUrl} alt="profile_user" />
        </ImageContainer>
      )}
      <Input
        allowSuggestionsAboveCursor
        value={input.content}
        onChange={onChangeChat}
        placeholder="멋진 글에 대한 소감을 입력해보세요!"
        inputRef={textareaRef}
      >
        <Mention
          appendSpaceOnAdd
          markup="@[__display__]{__id__}"
          trigger="@"
          data={mentionData}
          renderSuggestion={renderUserSuggestion}
          displayTransform={(id: any, display: any) => `@${display}`}
        />
      </Input>
      <ButtonWrapper>
        {onToggle && (
          <Button backgroundColor="#CECECE" onClick={() => onToggle(false)}>
            취소
          </Button>
        )}
        <Button onClick={onSubmit}>확인</Button>
      </ButtonWrapper>
    </Container>
  );
};

export default CommentEditor;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.background};
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

const ButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 10px;
  bottom: 30px;
  right: 37px;
`;
const Button = styled.button<{ backgroundColor?: string }>`
  padding: 11px 30px;
  border-radius: 51px;
  background-color: ${({ theme, backgroundColor }) => backgroundColor ?? theme.colors.main};
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
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
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1.75rem;
  width: 30%;
  height: 100%;
  & > img {
    width: 69px;
    height: 69px;
    border-radius: 10px;
  }
`;
