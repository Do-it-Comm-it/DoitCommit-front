import styled from 'styled-components';
import React from 'react';

type DIInputProps = {
  defaultValue?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange: (text: string) => void;
  backgroundColor?: string;
  fontColor?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  hasBorder?: boolean;
};

const DIInput = ({
  defaultValue = '',
  width = 120,
  height = 30,
  borderRadius = 5,
  backgroundColor,
  onFocus = () => {},
  onChange,
  onBlur,
  placeholder,
  style,
  fontColor,
  hasBorder,
}: DIInputProps) => {
  return (
    <Input
      value={defaultValue}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      fontColor={fontColor}
      onFocus={onFocus}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      onBlur={onBlur}
      placeholder={placeholder}
      style={style}
      hasBorder={hasBorder}
    />
  );
};

const Input = styled.input<{
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor?: string;
  fontColor?: string;
  hasBorder?: boolean;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 0;
  margin: 0 auto;
  font-size: 18px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  background-color: ${({ backgroundColor, theme }) => backgroundColor ?? theme.colors.searchBar};
  text-indent: 8px;
  box-shadow: ${({ hasBorder }) => (hasBorder ? '' : '0px 0px 12px rgba(0, 0, 0, 0.1)')};
  color: ${({ theme, fontColor }) => fontColor ?? theme.colors.dark.a7};
  &:focus {
    outline: none !important;
    border: 1px solid red;
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.main};
    border-color: ${({ theme }) => theme.colors.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark.a2};
    text-align: center;
  }
`;

export default DIInput;
