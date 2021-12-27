import { useAuthentication } from '@src/hooks/useAuthentication';
import { modalAtom } from '@src/recoil/atom/modal';
import { userAtom } from '@src/recoil/atom/user';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { CloseModalButton, CreateModal } from './styles';

interface Props {
  showCloseIcon?: boolean;
}

const Modal = ({ showCloseIcon = false }: Props) => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const user = useRecoilValue(userAtom);
  const closeModal = useCallback(() => {
    setModal({ ...modal, visible: false });
  }, [modal, setModal]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (user && !user.isEnrolled) setModal({ id: 'register', visible: true });
  }, [user, setModal]);

  return (
    <>
      {modal.visible && (
        <CreateModal onClick={closeModal}>
          <div onClick={stopPropagation}>
            {showCloseIcon && <CloseModalButton onClick={closeModal} width="45" height="45" />}
            {modal.id === 'login' && modal.visible && <LoginModal onClose={closeModal} />}
            {modal.id === 'register' && modal.visible && <RegisterModal onFinish={closeModal} />}
          </div>
        </CreateModal>
      )}
    </>
  );
};

export default Modal;
