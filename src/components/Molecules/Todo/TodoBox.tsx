import React, { useCallback } from 'react';
import styled from 'styled-components';
import PlannerLabel from '../Planner/PlannerLabel';
import { AiOutlinePushpin, AiFillPushpin } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { deleteTodo, finishTodo, fixedTodo } from '@src/service/api';
import { modalAtom } from '@src/recoil/atom/modal';
import { devices } from '@src/utils/theme';
import { convertDayToName } from '../Planner/PlannerDate';
import { ITodos } from '@src/typings/Todos';
import PinSVG from '@src/assets/notification.svg';
type TodoBoxProps = {
  todo: ITodos;
  onRefetch: () => void;
};

const TodoBox = ({ todo, onRefetch }: TodoBoxProps) => {
  const setModal = useSetRecoilState(modalAtom);

  const onDelete = useCallback(async () => {
    const result = await deleteTodo(String(todo.todoId));
    if (result) {
      onRefetch();
    }
  }, [todo.todoId, onRefetch]);

  const onFixed = useCallback(async () => {
    const result = await fixedTodo(String(todo.todoId));
    if (result === 1) {
      onRefetch();
    }
  }, [todo.todoId, onRefetch]);

  const onFinish = useCallback(async () => {
    const result = await finishTodo(String(todo.todoId));
    if (result === 1) {
      onRefetch();
    }
  }, [todo.todoId, onRefetch]);

  const onEdit = useCallback(() => {
    setModal({ id: 'todo', visible: true, todoId: todo.todoId });
  }, [setModal, todo.todoId]);

  return (
    <Wrapper>
      {todo && (
        <Container>
          <Header>
            <Labels>
              <PlannerLabel level={todo.importance} />
              <PlannerLabel name={todo.type} />
            </Labels>
            {todo.isFixed ? <FillPin onClick={onFixed} /> : <Pin onClick={onFixed} />}
          </Header>
          <Content>
            <Title>{todo.title}</Title>
            <DateRow>{ConvertDate(todo.todoDateTime ?? '')}</DateRow>
            <Body>{todo.content}</Body>
          </Content>
          <Footer>
            <DeleteIcon onClick={onDelete} />
            <Left>
              <EditIcon onClick={onEdit} />
              {todo.isFinished ? <CheckFinishedIcon onClick={onFinish} /> : <CheckIcon onClick={onFinish} />}
            </Left>
          </Footer>
        </Container>
      )}
    </Wrapper>
  );
};

const ConvertDate = (date: string) => {
  const d = new Date(date.replaceAll('/', '-'));

  return `${convertDayToName(d.getDay())} ${d.getDay()} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

const Wrapper = styled.div`
  display: flex;
  min-width: 286px;
  min-height: 330px;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  flex-direction: column;

  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;

  @media ${devices.laptop} {
    max-width: 386px;
  }

  @media ${devices.tablet} {
    max-width: 100%;
  }
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
const Pin = styled(PinSVG)`
  & > path {
    stroke: ${({ theme }) => theme.colors.main};
  }
`;
const FillPin = styled(PinSVG)`
  & > path {
    stroke: ${({ theme }) => theme.colors.main};
    fill: ${({ theme }) => theme.colors.sub3};
  }
`;
const DeleteIcon = styled(RiDeleteBin6Line)`
  color: ${({ theme }) => theme.colors.dark.a3};

  &:hover {
    cursor: pointer;
  }
`;
const EditIcon = styled(MdModeEdit)`
  color: ${({ theme }) => theme.colors.dark.a3};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;
const CheckIcon = styled(BsCheckCircle)`
  color: ${({ theme }) => theme.colors.dark.a3};
`;
const CheckFinishedIcon = styled(BsCheckCircle)`
  color: ${({ theme }) => theme.colors.dark.a3};
  fill: ${({ theme }) => theme.colors.sub3};
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
  color: ${({ theme }) => theme.colors.dark.a7};
`;
const DateRow = styled.span`
  margin-top: 12px;
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.dark.a3};
`;
const Body = styled.span`
  margin-top: 25px;
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;

  color: ${({ theme }) => theme.colors.dark.a3};
`;
const Footer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled.div``;
export default React.memo(TodoBox);
