import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import WriteSVG from '@src/assets/write.svg';

const FloatingButton = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const onToggle = useCallback((value) => {
    setIsHover(value);
  }, []);
  return (
    <Container onMouseLeave={() => onToggle(false)}>
      <FloatContainer isHover={isHover}>
        {isHover && (
          <StyledLink to="/community/edit">
            <WriteSVG />
            <span>작성 하기</span>
          </StyledLink>
        )}
      </FloatContainer>
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
  background-color: ${({ theme }) => theme.colors.primary.default};
`;

const FloatContainer = styled.div<{ isHover?: boolean }>`
  display: ${({ isHover }) => (isHover ? 'flex' : 'none')};
  width: 146px;
  height: 52px;
  border-radius: 56px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary.default};
  & > * {
    margin-right: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.white};
`;
