import styled from 'styled-components';
import React from 'react';

type DIButtonProps = {
  value?: string;
  borderRadius?: number;
  backgroundColor?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  onClick: () => void;
};

const DIButton = ({
  width = 120,
  height = 45,
  value = 'Click',
  borderRadius = 15,
  backgroundColor = '#AACD06',
  children,
  onClick = () => {},
}: DIButtonProps) => {
  return (
    <Button
      width={width}
      height={height}
      value={value}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      name={value}
      onClick={onClick}
    >
      {children ? children : value}
    </Button>
  );
};

const Button = styled.button<{ width: number; height: number; borderRadius: number; backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  font-weight: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border: 0;
  outline: 0;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

export default DIButton;
