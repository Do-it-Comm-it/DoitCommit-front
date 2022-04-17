import styled from 'styled-components';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
type DILabelProps = {
  backgroundColor?: string;
  children?: React.ReactNode;
  onDelete?: () => void;
};

const DILabel = ({
  backgroundColor = "'#b4b4b4'",
  children,
  onDelete,
}: DILabelProps) => {
  return (
    <Container>
      <Label backgroundColor={backgroundColor}>{children}</Label>
      <Close size={20} onClick={onDelete} />
    </Container>
  );
};
const Close = styled(IoIosClose)`
  top: 7px;
  right: 5px;

  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
  z-index: 5;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
const Label = styled.div<{ backgroundColor: string }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px;
  height: 20px;
  padding: 5px;
  margin: 2px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.sub};
`;

export default DILabel;
