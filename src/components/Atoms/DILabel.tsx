import styled from 'styled-components';
import React from 'react';

type DILabelProps = {
  backgroundColor?: string;
  children?: React.ReactNode;
};

const DILabel = ({ backgroundColor = "'#b4b4b4'", children }: DILabelProps) => {
  return <Label backgroundColor={backgroundColor}>{children}</Label>;
};

const Label = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default DILabel;
