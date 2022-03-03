import React from 'react';
import styled from 'styled-components';

const CommentEditor = () => {
  return (
    <Container>
      <Input onChange={() => {}} placeholder="멋진 글에 대한 소감을 입력해보세요!" />
      <Button>확인</Button>
    </Container>
  );
};

export default CommentEditor;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  position: relative;
`;

const Input = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.dark.a7};
  font-weight: 350;
  font-size: 20px;
  padding: 40px 52px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.dark.a3};
    font-weight: 350;
    font-size: 20px;
  }
`;

const Button = styled.button`
  position: absolute;
  padding: 11px 30px;
  border-radius: 51px;
  background-color: ${({ theme }) => theme.colors.main};
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  bottom: 30px;
  right: 37px;
  border: none;
`;
