import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Container, ContentCol, ContentRow } from '@src/components/Atoms/Modal';
import { Importance, TodoType } from '@src/typings/Todos';
import { titleCase } from '@src/utils/string';

interface Props {
  importance: Importance;
  type: string;
  onChangeImportance: (importance: Importance) => void;
  onChangeType: (type: TodoType) => void;
}

enum REPEAT {
  YES = 1,
  NO = 0,
}

const typeList = [
  { type: TodoType.PRIVATE, label: '마이 두잇' },
  { type: TodoType.GROUP, label: '그룹 두잇' },
];

const importanceList = [
  { backgroundColor: '#FDECF2', color: '#E24781', importance: Importance.HIGH },
  {
    backgroundColor: '#E6F3FE',
    color: '#5872CF',
    importance: Importance.MEDIUM,
  },
  { backgroundColor: '#E3F4E4', color: '#4F8234', importance: Importance.LOW },
];

const TagContainer = ({
  importance,
  onChangeImportance,
  type,
  onChangeType,
}: Props) => {
  // const [repeat, setRepeat] = useState<REPEAT>(REPEAT.NO);
  const theme = useTheme();
  return (
    <Container>
      <ContentCol alignItems="center" padding="20px" widthFull>
        <ContentRow alignItems="center" padding="10px 0" widthFull>
          <Label>분류</Label>
          {typeList.map((item) => (
            <CheckButton
              backgroundColor={theme.colors.primary.default}
              color="#ffffff"
              checked={type === item.type}
              onClick={() => onChangeType(item.type)}
            >
              {item.label}
            </CheckButton>
          ))}
        </ContentRow>
        <ContentRow alignItems="center" padding="10px 0" widthFull>
          <Label>중요도</Label>
          {importanceList.map((item) => (
            <CheckButton
              key={item.importance}
              backgroundColor={item.backgroundColor}
              color={item.color}
              checked={item.importance === importance}
              onClick={() => onChangeImportance(item.importance)}
            >
              {titleCase(item.importance)}
            </CheckButton>
          ))}
        </ContentRow>
        <ContentRow alignItems="center" padding="10px 0" widthFull>
          <Label>반복</Label>
          <RadioContainer>
            <RadioButton type={'radio'} name={'repeat'} value={REPEAT.YES} />
            <RadioText>반복</RadioText>
          </RadioContainer>

          <RadioContainer marginLeft={30}>
            <RadioButton type={'radio'} name={'repeat'} value={REPEAT.NO} />
            <RadioText>반복 안함</RadioText>
          </RadioContainer>
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
  color: ${({ theme }) => theme.colors.black};
`;

const CheckButton = styled.div<{
  backgroundColor?: string;
  color?: string;
  checked?: boolean;
}>`
  border-radius: 50px;
  padding: 6px 22px;
  background-color: ${({ checked, backgroundColor, theme }) =>
    checked ? backgroundColor : 'transparent'};
  color: ${({ checked, color }) => (checked ? color : '#DADADA')};
  border: ${({ checked }) => (checked ? 'none' : '1px solid #dadada')};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
`;

const RadioButton = styled.input`
  &:first-child {
    margin-left: 0px;
  }
`;
const RadioText = styled.span`
  margin-left: 8px;
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
`;

const RadioContainer = styled.div<{ marginLeft?: number }>`
  display: flex;

  align-items: center;
  margin-left: ${({ marginLeft }) => marginLeft || 0}px;
`;
