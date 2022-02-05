import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Container, ContentCol, ContentRow } from '@src/components/Atoms/Modal';

interface Props {
  content: string;
  onChangeContent: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
}
const TextAreaContainer = ({ content, onChangeContent }: Props) => {
  return (
    <Container>
      <ContentCol heightFull widthFull padding="20px">
        <ContentRow widthFull heightFull>
          <Label>내용</Label>
          <TextArea
            placeholder="내용을 입력 하세요. (최대 230자)"
            onChange={onChangeContent}
            defaultValue={content || ''}
          />
        </ContentRow>
      </ContentCol>
    </Container>
  );
};

export default TextAreaContainer;

const Label = styled.label`
  font-size: 20px;
  font-weight: 500;
  color: #18171c;
  width: 25%;
  text-align: start;
  padding-left: 15px;
`;

const TextArea = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 500;
  resize: none;
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #dadada;
    font-weight: inherit;
    font-size: inherit;
  }
`;
