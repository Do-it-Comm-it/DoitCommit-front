import React, { useCallback } from 'react';
import styled from 'styled-components';
import PlannerLabel from '../Planner/PlannerLabel';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdModeEdit } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { todo as todoAPI } from '@src/service/api';
import { modalAtom } from '@src/recoil/atom/modal';
import { devices } from '@src/utils/theme';
import { convertDayToName } from '../Planner/PlannerDate';
import { ITodos } from '@src/typings/Todos';
import PinSVG from '@src/assets/notification.svg';
import BookmarkSVG from '@src/assets/bookmark.svg';
import { useState } from 'react';
type TodoBoxProps = {
  todo: ITodos;
  onRefetch: () => void;
  isEmpty?: boolean;
};

const TodoBox = ({ todo, onRefetch, isEmpty }: TodoBoxProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const setModal = useSetRecoilState(modalAtom);

  const onDelete = useCallback(async () => {
    const result = await todoAPI.deleteTodo(String(todo.todoId));
    if (result) {
      onRefetch();
    }
  }, [todo.todoId, onRefetch]);

  const onFixed = useCallback(async () => {
    const result = await todoAPI.fixTodo(String(todo.todoId));
    if (result === 1) {
      onRefetch();
    }
  }, [todo.todoId, onRefetch]);

  const onFinish = useCallback(async () => {
    const result = await todoAPI.finishTodo(String(todo.todoId));
    if (result === 1) {
      onRefetch();
    }
  }, [todo.todoId, onRefetch]);

  const onEdit = useCallback(() => {
    setModal({ id: 'todo', visible: true, todoId: todo.todoId });
  }, [setModal, todo.todoId]);

  const onToggle = useCallback((value) => {
    setIsHover(value);
  }, []);

  return (
    <Wrapper
      onMouseEnter={() => {
        onToggle(true);
      }}
      onMouseLeave={() => {
        onToggle(false);
      }}
    >
      <BookmarkIcon isHover={isHover} />
      {todo && (
        <Container>
          {!isEmpty && (
            <Header>
              <Labels>
                <PlannerLabel level={todo.importance} />
                <PlannerLabel name={todo.type} />
              </Labels>
              {todo.isFixed ? (
                <FillPin onClick={onFixed} />
              ) : (
                <Pin onClick={onFixed} />
              )}
            </Header>
          )}
          <Content>
            <Title isEmpty={isEmpty}>{todo.title}</Title>
            {!isEmpty && (
              <DateRow>{ConvertDate(todo.todoDateTime ?? '')}</DateRow>
            )}
            <Body isEmpty={isEmpty}>{todo.content}</Body>
          </Content>
          {!isEmpty && (
            <Footer>
              <DeleteIcon onClick={onDelete} />
              <Left>
                <EditIcon onClick={onEdit} />
                {todo.isFinished ? (
                  <CheckFinishedIcon onClick={onFinish} />
                ) : (
                  <CheckIcon onClick={onFinish} />
                )}
              </Left>
            </Footer>
          )}
        </Container>
      )}
    </Wrapper>
  );
};

const ConvertDate = (date: string) => {
  const d = new Date(date.replaceAll('/', '-'));

  return `${convertDayToName(
    d.getDay()
  )} ${d.getDay()} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};

const Wrapper = styled.div`
  display: flex;
  min-width: 286px;
  min-height: 330px;
  max-width: 385px;
  background: ${({ theme }) => theme.colors.gray.gray200};
  flex-direction: column;
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 10px;
  @media ${devices.laptop} {
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
    stroke: ${({ theme }) => theme.colors.primary.default};
  }
`;
const FillPin = styled(PinSVG)`
  & > path {
    stroke: ${({ theme }) => theme.colors.primary.default};
    fill: ${({ theme }) => theme.colors.primary.light400};
  }
`;
const DeleteIcon = styled(RiDeleteBin6Line)`
  color: ${({ theme }) => theme.colors.gray.gray400};

  &:hover {
    cursor: pointer;
  }
`;
const EditIcon = styled(MdModeEdit)`
  color: ${({ theme }) => theme.colors.gray.gray400};
  margin-right: 10px;

  &:hover {
    cursor: pointer;
  }
`;
const CheckIcon = styled(BsCheckCircle)`
  color: ${({ theme }) => theme.colors.gray.gray400};
`;
const CheckFinishedIcon = styled(BsCheckCircle)`
  color: ${({ theme }) => theme.colors.gray.gray400};
  fill: ${({ theme }) => theme.colors.primary.light400};
`;
const BookmarkIcon = styled(BookmarkSVG)<{ isHover: boolean }>`
  & > path {
    stroke: ${({ theme }) => theme.colors.gray.gray400};
    fill: ${({ theme }) => theme.colors.gray.gray400};
  }
  width: 32px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 25px;
  transition: all 0.7s;
  opacity: ${({ isHover }) => (isHover ? 1 : 0)};
`;

const Content = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.span<{ isEmpty?: boolean }>`
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: ${({ isEmpty }) => (isEmpty ? 24 : 20)}px;
  line-height: 29px;
  color: ${({ theme }) => theme.colors.gray.gray950};

  word-wrap: break-word;
  white-space: pre-line;
`;
const DateRow = styled.span`
  margin-top: 12px;
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;
const Body = styled.span<{ isEmpty?: boolean }>`
  margin-top: 25px;
  font-family: ${({ theme }) => theme.font.NotoSansKRRegular};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 23px;

  color: ${({ theme, isEmpty }) =>
    isEmpty ? theme.colors.primary.default : theme.colors.gray.gray400};
`;
const Footer = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled.div``;
export default React.memo(TodoBox);
