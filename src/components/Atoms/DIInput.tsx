import styled from 'styled-components';
import React from 'react';

type DIInputProps = {
  defaultValue?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  onFocus?: () => void;
  onChange: (text: string) => void;
};

const DIInput = ({
  defaultValue = '',
  width = 120,
  height = 30,
  borderRadius = 8,
  onFocus = () => {},
  onChange,
}: DIInputProps) => {
  return (
    <InputArea
      value={defaultValue}
      borderRadius={borderRadius}
      width={width}
      height={height}
      onFocus={onFocus}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  );
};

const InputArea = styled.input<{ width: number; height: number; borderRadius: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 0;
  margin: 0 auto;
  border: solid 1px #ccc;
  border-radius: ${({ borderRadius }) => borderRadius}px;
`;

export default DIInput;
