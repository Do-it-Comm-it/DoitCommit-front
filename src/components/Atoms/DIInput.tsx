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
};

const DIInput = ({
  defaultValue = '',
  width = 120,
  height = 30,
  borderRadius = 8,
  backgroundColor = '#fff',
  onFocus = () => {},
  onChange,
  onBlur,
}: DIInputProps) => {
  return (
    <InputArea
      value={defaultValue}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      width={width}
      height={height}
      onFocus={onFocus}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      onBlur={onBlur}
    />
  );
};

const InputArea = styled.input<{ width: number; height: number; borderRadius: number; backgroundColor: string }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 0;
  margin: 0 auto;
  border: solid 1px #ccc;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-indent: 8px;
`;

export default DIInput;
