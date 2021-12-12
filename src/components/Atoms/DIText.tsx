import styled from 'styled-components';
import React from 'react';

type DITextProps = {
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
};

//TO DO: Add font-family , Linkable Text(Optional)
const DIText = ({ fontColor = "'#fff'", fontSize = 16, fontWeight = 400, children, style, onClick }: DITextProps) => {
  return (
    <Text style={style} fontColor={fontColor} fontSize={fontSize} fontWeight={fontWeight} onClick={onClick}>
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
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
`;

export default DIText;
