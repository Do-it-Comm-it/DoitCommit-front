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
};

const DIButton = ({
  disabled = false,
  width = 154,
  height = 52,
  value = 'Click',
  borderRadius = 15,
  backgroundColor = '#AACD06',
  hoverColor = '#97b806',
  children,
  onClick = () => {},
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
  hoverColor: string;
  disabled: boolean;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border: 0;
  outline: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-size: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    cursor: pointer;
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;
export default DIButton;
