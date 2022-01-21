import React from 'react';
import styled from 'styled-components';

type DIButtonProps = {
  value?: string;
  borderRadius?: number;
  backgroundColor?: string;
  hoverColor?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  borderColor?: string;
  color?: string;
};

const DIButton = ({
  disabled = false,
  width = 154,
  height = 52,
  value = 'Click',
  borderRadius = 5,
  backgroundColor = '#AACD06',
  hoverColor,
  borderColor,
  color,
  children,
  onClick = () => {},
  style,
}: DIButtonProps) => {
  return (
    <Button
      disabled={disabled}
      width={width}
      height={height}
      value={value}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      name={value}
      onClick={onClick}
      style={style}
      borderColor={borderColor}
      color={color}
    >
      {children ? children : value}
    </Button>
  );
};

const Button = styled.button<{
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
  hoverColor?: string;
  disabled: boolean;
  borderColor?: string;
  color?: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border: 0;
  outline: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  color: ${({ color }) => color};
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-size: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: 1px solid ${({ borderColor }) => borderColor};

  &:hover {
    cursor: pointer;
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;
export default DIButton;
