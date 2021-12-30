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
  placholder?: string;
};

const DIInput = ({
  defaultValue = '',
  width = 120,
  height = 30,
  borderRadius = 5,
  backgroundColor = '#fff',
  onFocus = () => {},
  onChange,
  onBlur,
  placholder,
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
      placeholder={placholder}
    />
  );
};

const InputArea = styled.input<{ width: number; height: number; borderRadius: number; backgroundColor: string }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  border: 0;
  margin: 0 auto;
  border: solid 2px #ececec;
  font-size: 18px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-indent: 8px;

  &:focus {
    outline: none !important;
    border: 1px solid red;
    box-shadow: 0 0 4px #aacd06;
    border-color: ${({ theme }) => theme.colors.main};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.dark.a2};
    text-align: center;
  }
`;

export default DIInput;
