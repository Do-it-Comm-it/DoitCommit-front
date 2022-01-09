import React from 'react';
import styled from 'styled-components';
interface Props {
  content: string;
  selected: boolean;
  border?: boolean;
  fontSize?: number;
  paddingSize?: number;
  onClick: () => void;
}
const TabButton = ({ content, onClick, selected = false, border = false, fontSize = 20, paddingSize = 35 }: Props) => {
  return (
    <Container onClick={onClick} selected={selected} border={border}>
      <Span selected={selected} fontSize={fontSize} paddingSize={paddingSize}>
        {content}
      </Span>
    </Container>
  );
};
const Container = styled.div<{ selected: boolean; border: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border-bottom: ${({ border, selected }) => border && selected && '2px solid #AACD06'};
`;

const Span = styled.span<{ selected: boolean; fontSize: number; paddingSize: number }>`
  color: ${({ selected }) => (selected ? '#000000' : '#8f9294')};
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: 400;
  padding: ${({ paddingSize }) => paddingSize}px;
`;

export default TabButton;
