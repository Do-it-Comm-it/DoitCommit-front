import { modalAtom } from '@src/recoil/atom/modal';
import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { CloseModalButton, CreateModal } from './styles';

interface Props {
  children: React.ReactNode;
  showCloseIcon?: boolean;
}

const Modal = ({ children, showCloseIcon = false }: Props) => {
  const [show, setShow] = useRecoilState(modalAtom);
  const closeModal = useCallback(() => {
    setShow({ ...show, visible: false });
  }, [show, setShow]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      {show.visible && (
        <CreateModal onClick={closeModal}>
          <div onClick={stopPropagation}>
            {showCloseIcon && <CloseModalButton onClick={closeModal} width="45" height="45" />}
            {children}
          </div>
        </CreateModal>
      )}
    </>
  );
};

export default Modal;
