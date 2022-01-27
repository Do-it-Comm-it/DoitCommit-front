import React from 'react';
import styled from 'styled-components';
import { Container, ContentCol, ContentRow } from '@src/components/Atoms/Modal';

interface Props {
  importance: string;
  type: string;
  onChangeImportance: (importance: string) => void;
  onChangeType: (type: string) => void;
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
            checked={importance === 'low'}
            onClick={() => onChangeImportance('low')}
          >
            Low
          </CheckButton>
          <CheckButton
            backgroundColor="#E6F3FE"
            color="#5872CF"
            checked={importance === 'medium'}
            onClick={() => onChangeImportance('medium')}
          >
            Medium
          </CheckButton>
          <CheckButton
            backgroundColor="#FDECF2"
            color="#E24781"
            checked={importance === 'high'}
            onClick={() => onChangeImportance('high')}
          >
            High
          </CheckButton>
        </ContentRow>
        <ContentRow alignItems="center" padding="10px 0" widthFull>
          <Label>분류</Label>
          <CheckButton
            backgroundColor="#AACD06"
            color="#ffffff"
            checked={type === '스터디'}
            onClick={() => onChangeType('스터디')}
          >
            스터디
          </CheckButton>
          <CheckButton
            backgroundColor="#AACD06"
            color="#ffffff"
            checked={type === '데일리'}
            onClick={() => onChangeType('데일리')}
          >
            데일리
          </CheckButton>
          <CheckButton
            backgroundColor="#AACD06"
            color="#ffffff"
            checked={type === '워크'}
            onClick={() => onChangeType('워크')}
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
