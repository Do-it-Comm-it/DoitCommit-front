import styled from 'styled-components';
import React from 'react';

type DITextProps = {
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  children?: React.ReactNode;
};

//TO DO: Add font-family , Linkable Text(Optional)
const DIText = ({ fontColor = "'#fff'", fontSize = 16, fontWeight = 400, children }: DITextProps) => {
  return (
    <Text fontColor={fontColor} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </Text>
  );
};

/*
INFO: font-weight information
  normal : 400
  bold: 700
*/
const Text = styled.pre<{ fontSize: number; fontColor: string; fontWeight: number }>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor }) => fontColor};
`;

export default DIText;
