import React from 'react';
import styled from 'styled-components';
import PlannerLabel from '../Planner/PlannerLabel';
import { AiOutlinePushpin, AiFillPushpin } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { todoIdState, todoItemState } from '@src/recoil/atom/todo';
import { deleteTodo, fixedTodo } from '@src/service/api';

type TodoBoxProps = {
  id: number;
};

const TodoBox = ({ id }: TodoBoxProps) => {
  const todo = useRecoilValue(todoItemState(id));
  const onDelete = useRecoilCallback(({ snapshot, set }) => async () => {
    const todoIds = snapshot.getLoadable(todoIdState).getValue();
    const result = await deleteTodo(String(id));
    if (result === 1) {
      set(
        todoIdState,
        [...todoIds].filter((t) => t !== id),
      );
    }
  });
  const onFixed = useRecoilCallback(({ set }) => async () => {
    const result = await fixedTodo(String(id));
    if (result === 1) {
      set(todoItemState(id), (prevState: any) => ({
        ...prevState,
        isFixed: !todo.isFixed,
      }));
    }
  });
  return (
    <Wrapper>
      <Container>
        <Header>
          <Labels>
            <PlannerLabel level={todo.importance} />
            <PlannerLabel name={todo.type} />
          </Labels>
          {todo.isFixed ? <FillPin size={16} onClick={onFixed} /> : <Pin size={16} onClick={onFixed} />}
        </Header>
        <Content>
          <Title>{todo.title}</Title>
          <Date>
            {/* {todo.todoDateTime?.getDay() +
              ' ' +
              todo.todoDateTime?.getFullYear() +
              ' ' +
              todo.todoDateTime?.getHours() +
              ':' +
              todo.todoDateTime?.getMinutes()} */}
          </Date>
          <Body>{todo.content}</Body>
        </Content>
        <Footer>
          <DeleteIcon onClick={onDelete} />
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
export default React.memo(TodoBox);
