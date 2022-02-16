import styled from 'styled-components';
import React from 'react';

type DITextProps = {
  fontColor?: string;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: string;
  children?: React.ReactNode;
  lineHeight?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
};

//TO DO: Add font-family , Linkable Text(Optional)
const DIText = ({
  fontColor,
  fontSize = 16,
  fontWeight = 400,
  children,
  fontFamily,
  style,
  onClick,
  lineHeight,
}: DITextProps) => {
  return (
    <Text
      style={style}
      fontColor={fontColor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onClick={onClick}
      lineHeight={lineHeight}
      fontFamily={fontFamily}
    >
      {children}
    </Text>
  );
};

/*
INFO: font-weight information
  normal : 400
  bold: 700
*/
const Text = styled.span<{
  fontSize: number;
  fontColor?: string;
  fontWeight: number;
  lineHeight?: number;
  fontFamily?: string;
}>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor, theme }) => fontColor ?? theme.colors.dark.a7};
  font-family: ${({ theme, fontFamily }) => (fontFamily ? fontFamily : theme.font.NotoSansKRRegular)};
  line-height: ${({ lineHeight }) => lineHeight}px;
`;

export default DIText;
