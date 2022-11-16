import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowSVG from '@src/assets/arrowCustom.svg';

type Props = {
  onScroll: () => void;
};
// TODO: arrow svg는 size를 current로 매기지 않아 두개를 만들었다 추후 변경할것
const FloatingScrollButton = ({ onScroll }: Props) => {
  return (
    <Container onClick={onScroll}>
      <Button>
        <ArrowIcon width={10} height={17} />
      </Button>
    </Container>
  );
};

export default FloatingScrollButton;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 80px;
  right: 30px;

  & > * {
    margin-right: 10px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 52px;
  height: 52px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary.light400};
`;

const ArrowIcon = styled(ArrowSVG)`
  & > path {
    fill: ${({ theme }) => theme.colors.primary.default};
    stroke: ${({ theme }) => theme.colors.primary.default};
  }
  transform: rotate(270deg);
`;
