import { TodoType } from '@src/components/Organisms/Home/HomeTodoList';
import React from 'react';
import styled from 'styled-components';
import PlannerLabel from '../Planner/PlannerLabel';
import { AiOutlinePushpin, AiFillPushpin } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';

type TodoBoxProps = {
  todo: TodoType;
};

const TodoBox = ({ todo }: TodoBoxProps) => {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Labels>
            <PlannerLabel level={todo.level} />
            <PlannerLabel name={todo.type} />
          </Labels>
          {todo.isPinned ? <FillPin size={16} /> : <Pin size={16} />}
        </Header>
        <Content>
          <Title>{todo.title}</Title>
          <Date>
            {todo.date.getDay() +
              ' ' +
              todo.date.getFullYear() +
              ' ' +
              todo.date.getHours() +
              ':' +
              todo.date.getMinutes()}
          </Date>
          <Body>{todo.body}</Body>
        </Content>
        <Footer>
          <DeleteIcon />
          <Left>
            <EditIcon />
            <CheckIcon />
          </Left>
        </Footer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-width: 386px;
  min-height: 330px;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;

  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 10px;
`;

const Container = styled.div`
  margin: 20px;
  height: 100%;
`;
const Header = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Labels = styled.div`
  display: flex;
  flex-direction: row;
`;
const Pin = styled(AiOutlinePushpin)``;
const FillPin = styled(AiFillPushpin)`
  color: ${({ theme }) => theme.colors.main};
`;
const DeleteIcon = styled(RiDeleteBin6Line)`
  color: ${({ theme }) => theme.colors.dark.a3};
`;
const EditIcon = styled(MdModeEdit)`
  color: ${({ theme }) => theme.colors.dark.a3};
  margin-right: 10px;
`;
const CheckIcon = styled(BsCheckCircle)`
  color: ${({ theme }) => theme.colors.dark.a3};
`;
const Content = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 29px;

  color: ${({ theme }) => theme.colors.dark.a5};
`;
const Date = styled.span`
  margin-top: 12px;
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;

  color: ${({ theme }) => theme.colors.dark.a5};
`;
const Body = styled.span`
  margin-top: 25px;
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;

  color: ${({ theme }) => theme.colors.dark.a5};
`;
const Footer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled.div``;
export default TodoBox;