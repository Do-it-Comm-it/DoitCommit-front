import { modalAtom } from '@src/recoil/atom/modal';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import LoginModal from '@src/components/Organisms/Modal/LoginModal';
import RegisterModal from '@src/components/Organisms/Modal/RegisterModal';
import TodoModal from '@src/components/Organisms/Modal/TodoModal';
import { useUser } from '@src/hooks/useAuthentication';

const Modal = () => {
  const { data: user } = useUser();
  const [modal, setModal] = useRecoilState(modalAtom);
  const closeModal = useCallback(() => {
    setModal({ ...modal, visible: false });
  }, [modal, setModal]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (user && user.nickname === null)
      setModal({ id: 'register', visible: true });
  }, [user, setModal]);

  return (
    <>
      {modal.id === 'login' && modal.visible && (
        <LoginModal onClose={closeModal} stopPropagation={stopPropagation} />
      )}
      {modal.id === 'register' && modal.visible && (
        <RegisterModal
          onFinish={closeModal}
          onClose={closeModal}
          stopPropagation={stopPropagation}
        />
      )}
      {modal.id === 'todo' && modal.visible && (
        <TodoModal
          onClose={closeModal}
          stopPropagation={stopPropagation}
          width={772}
          height={647}
          todoId={modal.todoId}
        />
      )}
    </>
  );
};

export default Modal;
