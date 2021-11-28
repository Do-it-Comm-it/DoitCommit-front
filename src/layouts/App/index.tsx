import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@src/pages/Home';
import { useAuthentication } from '@src/hooks/useAuthentication';
import { useCallback } from 'react';

import { useState } from 'react';
import LoginModal from '@src/components/LoginModal';
import { modalAtom } from '@src/recoil/atom/modal';
import { useRecoilState, useSetRecoilState } from 'recoil';

const App = () => {
  useAuthentication();
  const [show, setShow] = useRecoilState(modalAtom);
  const onCloseModal = useCallback(() => {
    setShow(false);
  }, []);
  return (
    <>
      <LoginModal show={show} onCloseModal={onCloseModal} />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
