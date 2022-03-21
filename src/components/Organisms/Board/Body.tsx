import Header from '@src/components/Organisms/Board/Header';
import React, { useMemo } from 'react';
import { Route, useHistory } from 'react-router';
import styled from 'styled-components';
import Notice from './Notice';
import CardContainer from './CardContainer';
import FloatingButton from './FloatingButton';
import BoardEditor from './BoardEditor';
import Board from './Board';
import { useUser } from '@src/hooks/useAuthentication';
import PrivateRoute from '@src/routes/PrivateRoute';

type BoardPathType = 'notice' | 'edit' | 'board' | 'index';

const Body = () => {
  const { data: user } = useUser();
  const history = useHistory();

  const path: BoardPathType = useMemo(() => {
    const name = history.location.pathname.split('/')[2];

    switch (name) {
      case 'notice':
        return 'notice';
      case 'edit':
        return 'edit';
      case 'board':
        return 'board';
      default:
        return 'index';
    }
  }, [history.location.pathname]);

  return (
    <Container>
      {path !== 'edit' && path !== 'board' && <Header />}
      <Route exact path="/community">
        <CardContainer />
      </Route>
      <Route exact path="/community/notice">
        <Notice />
      </Route>
      {user && <Route exact path="/community/edit" component={BoardEditor} />}
      <Route exact path="/community/board/:id">
        <Board />
      </Route>
      {user && path !== 'edit' && path !== 'board' && <FloatingButton />}
    </Container>
  );
};

export default Body;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`;
