import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Notice from './Notice';
import Articles from './Articles';
import FloatingButton from './FloatingButton';
import BoardEditor from './BoardEditor';
import Board from './Board';
import { useUser } from '@src/hooks/useAuthentication';
import { Route, Routes, useLocation } from 'react-router-dom';
import FloatingScrollButton from './FloatingScrollButton';
import useScrollTop from '@src/hooks/useScrollTop';

type BoardPathType = 'notice' | 'edit' | 'board' | 'index';

const Body = () => {
  const { data: user } = useUser();
  const location = useLocation();
  const { showButton, onScroll } = useScrollTop(700);
  const path: BoardPathType = useMemo(() => {
    const name = location.pathname.split('/')[2];

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
  }, [location.pathname]);

  return (
    <Container>
      <Routes>
        <Route path="" element={<Articles />} />
        <Route path="/notice" element={<Notice />} />
        {user && <Route path="/edit" element={<BoardEditor />} />}
        <Route path="/board/:id" element={<Board />} />
      </Routes>

      {user && path !== 'edit' && path !== 'board' && <FloatingButton />}
      {showButton && <FloatingScrollButton onScroll={onScroll} />}
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
