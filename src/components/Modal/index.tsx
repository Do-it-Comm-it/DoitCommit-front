import { modalAtom } from '@src/recoil/atom/modal';
import React, { useCallback } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { CloseModalButton, CreateModal } from './styles';

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  const [show, setShow] = useRecoilState(modalAtom);
  const closeModal = useCallback(() => {
    setShow(false);
  }, []);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  if (!show) return null;

  return (
    <CreateModal onClick={closeModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={closeModal} width="45" height="45" />
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
