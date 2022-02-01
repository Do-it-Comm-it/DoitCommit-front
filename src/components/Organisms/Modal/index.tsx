import { modalAtom } from '@src/recoil/atom/modal';
import { userAtom } from '@src/recoil/atom/user';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoginModal from '@src/components/Organisms/Modal/LoginModal';
import RegisterModal from '@src/components/Organisms/Modal/RegisterModal';
import TodoModal from '@src/components/Organisms/Modal/TodoModal';

const Modal = () => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const user = useRecoilValue(userAtom);
  const closeModal = useCallback(() => {
    setModal({ ...modal, visible: false });
  }, [modal, setModal]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (user && user.nickname === null) setModal({ id: 'register', visible: true });
  }, [user, setModal]);

  return (
    <>
      {modal.id === 'login' && modal.visible && <LoginModal onClose={closeModal} stopPropagation={stopPropagation} />}
      {modal.id === 'register' && modal.visible && (
        <RegisterModal onFinish={closeModal} onClose={closeModal} stopPropagation={stopPropagation} />
      )}
      {modal.id === 'todo' && modal.visible && (
        <TodoModal onClose={closeModal} stopPropagation={stopPropagation} width={772} height={647} />
      )}
    </>
  );
};

export default Modal;
