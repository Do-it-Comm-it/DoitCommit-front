import { modalAtom } from '@src/recoil/atom/modal';
import React, { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { CloseModalButton, CreateModal } from './styles';

interface Props {
  children: React.ReactNode;
  id: string;
}

const Modal = ({ id, children }: Props) => {
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
            <CloseModalButton onClick={closeModal} width="45" height="45" />
            {children}
          </div>
        </CreateModal>
      )}
    </>
  );
};

export default Modal;
