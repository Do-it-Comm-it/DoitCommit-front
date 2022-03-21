import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WriteSVG from '@src/assets/write.svg';
const FloatingButton = () => {
  const [hover, setHover] = useState(false);
  const onToggle = useCallback((value) => {
    setHover(value);
  }, []);
  return (
    <Container onMouseLeave={() => onToggle(false)}>
      <WriteLink to="/community/edit" hover={hover}>
        {hover && (
          <>
            <WriteSVG />
            <span>작성 하기</span>
          </>
        )}
      </WriteLink>
      <Button onMouseEnter={() => onToggle(true)}>
        <WriteSVG />
      </Button>
    </Container>
  );
};

export default FloatingButton;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 20px;
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
  background-color: ${({ theme }) => theme.colors.main};
`;

const WriteLink = styled(Link)<{ hover: boolean }>`
  display: ${({ hover }) => (hover ? 'flex' : 'none')};
  width: 146px;
  height: 52px;
  border-radius: 56px;
  text-decoration: none;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.main};
  & > * {
    margin-right: 10px;
  }
`;
