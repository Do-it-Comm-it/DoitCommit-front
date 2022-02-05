import React from 'react';
import styled from 'styled-components';
import { Container, ContentCol, ContentRow } from '@src/components/Atoms/Modal';
import { TodoType } from '@src/typings/Todos';

interface Props {
  importance: string;
  type: string;
  onChangeImportance: (importance: string) => void;
  onChangeType: (type: TodoType) => void;
}
const TagContainer = ({ importance, onChangeImportance, type, onChangeType }: Props) => {
  return (
    <Container>
      <ContentCol alignItems="center" padding="20px" widthFull>
        <ContentRow alignItems="center" padding="10px 0" widthFull>
          <Label>중요도</Label>
          <CheckButton
            backgroundColor="#E3F4E4"
            color="#4F8234"
            checked={importance === 'LOW'}
            onClick={() => onChangeImportance('LOW')}
          >
            Low
          </CheckButton>
          <CheckButton
            backgroundColor="#E6F3FE"
            color="#5872CF"
            checked={importance === 'MEDIUM'}
            onClick={() => onChangeImportance('MEDIUM')}
          >
            Medium
          </CheckButton>
          <CheckButton
            backgroundColor="#FDECF2"
            color="#E24781"
            checked={importance === 'HIGH'}
            onClick={() => onChangeImportance('HIGH')}
          >
            High
          </CheckButton>
        </ContentRow>
        <ContentRow alignItems="center" padding="10px 0" widthFull>
          <Label>분류</Label>
          <CheckButton
            backgroundColor="#AACD06"
            color="#ffffff"
            checked={type === TodoType.STUDY}
            onClick={() => onChangeType(TodoType.STUDY)}
          >
            스터디
          </CheckButton>
          <CheckButton
            backgroundColor="#AACD06"
            color="#ffffff"
            checked={type === TodoType.DAILY}
            onClick={() => onChangeType(TodoType.DAILY)}
          >
            데일리
          </CheckButton>
          <CheckButton
            backgroundColor="#AACD06"
            color="#ffffff"
            checked={type === TodoType.WORK}
            onClick={() => onChangeType(TodoType.WORK)}
          >
            워크
          </CheckButton>
        </ContentRow>
      </ContentCol>
    </Container>
  );
};

export default TagContainer;

const Label = styled.label`
  font-size: 20px;
  font-weight: 500;
  color: #18171c;
  width: 25%;
  text-align: start;
  padding-left: 15px;
`;

const CheckButton = styled.div<{ backgroundColor?: string; color?: string; checked?: boolean }>`
  border-radius: 50px;
  padding: 6px 22px;
  background-color: ${({ checked, backgroundColor }) => (checked ? backgroundColor : '#ffffff')};
  color: ${({ checked, color }) => (checked ? color : '#DADADA')};
  border: ${({ checked }) => (checked ? 'none' : '1px solid #dadada')};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
`;
