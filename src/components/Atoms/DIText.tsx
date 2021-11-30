import styled from 'styled-components';
import React from 'react';

type DIInputProps = {
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  children?: React.ReactNode;
};

const DIText = ({ fontColor = "'#fff'", fontSize = 16, fontWeight = 1, children }: DIInputProps) => {
  return (
    <Text fontColor={fontColor} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </Text>
  );
};

const Text = styled.p<{ fontSize: number; fontColor: string; fontWeight: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor }) => fontColor};
`;

export default DIText;
