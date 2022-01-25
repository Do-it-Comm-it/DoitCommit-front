import React from 'react';
import styled from 'styled-components';
import { Container, ContentCol, ContentRow } from '@src/components/Atoms/Modal';
const TagContainer = () => {
  return (
    <Container>
      <ContentCol alignItems="center" padding="20px" widthFull>
        <ContentRow alignItems="center" padding="10px 0" widthFull>
          <Label>중요도</Label>
          <CheckButton backgroundColor="#E3F4E4" color="#4F8234" checked>
            Low
          </CheckButton>
          <CheckButton>Medium</CheckButton>
          <CheckButton backgroundColor="#E3F4E4" color="#4F8234">
            High
          </CheckButton>
        </ContentRow>
        <ContentRow alignItems="center" padding="10px 0" widthFull>
          <Label>분류</Label>
          <CheckButton backgroundColor="#AACD06" color="#ffffff">
            Study
          </CheckButton>
          <CheckButton>Study</CheckButton>
          <CheckButton>Study</CheckButton>
          <CheckButton>Study</CheckButton>
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
