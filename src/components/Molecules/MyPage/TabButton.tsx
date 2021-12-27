import React from 'react';
import styled from 'styled-components';
interface Props {
  content: string;
  selected: boolean;
  onClick: () => void;
}
const TabButton = ({ content, onClick, selected = false }: Props) => {
  return (
    <Container onClick={onClick} selected={selected}>
      <Span selected={selected}>{content}</Span>
    </Container>
  );
};
const Container = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  padding: 0 15px;
  border-bottom: ${({ selected }) => selected && '2px solid #AACD06'};
`;

const Span = styled.span<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? '#000000' : '#8f9294')};
  font-size: 20px;
  font-weight: 400;
`;

export default TabButton;
