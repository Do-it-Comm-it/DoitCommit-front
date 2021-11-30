import styled from 'styled-components';
import React from 'react';

type DIInputProps = {
  width?: number;
  height?: number;
  borderRadius?: number;
  onFocus?: () => void;
  onChange: (text: string) => void;
};

const DIInput = ({ width = 50, height = 50, borderRadius = 15, onFocus = () => {}, onChange }: DIInputProps) => {
  return (
    <InputWrapper>
      <InputArea
        borderRadius={borderRadius}
        width={width}
        height={height}
        onFocus={onFocus}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div``;
const InputArea = styled.input<{ width: number; height: number; borderRadius: number }>`
  width: width;
  height: height;
  border-radius: borderRadius;
`;

export default DIInput;
