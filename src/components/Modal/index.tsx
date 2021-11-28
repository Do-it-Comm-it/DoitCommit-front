import React, { useCallback } from 'react';
import { RecoilState } from 'recoil';
import { CloseModalButton, CreateModal } from './styles';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
}

const Modal = ({ show, onCloseModal, children }: Props) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  if (!show) return null;

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
