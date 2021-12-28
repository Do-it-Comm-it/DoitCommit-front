import { modalAtom } from '@src/recoil/atom/modal';
import { userAtom } from '@src/recoil/atom/user';
import { putWithToken } from '@src/utils/fetcher';
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

  const onFinish = useCallback(() => {
    putWithToken('http://localhost:8888/api/user', user && user.token, {
      // 현재 닉네임만 수정해보았음.
      userNickname: user?.nickname,
    }).then((res) => {
      // 응답이 true 이면 모달창 닫기
      if (res) {
        setModal({ ...modal, visible: false });
      }
    });
  }, [modal, setModal, user]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (user && !user.nickname) setModal({ id: 'register', visible: true });
  }, [user, setModal]);

  return (
    <>
      {modal.visible && (
        <CreateModal onClick={closeModal}>
          <div onClick={stopPropagation}>
            {showCloseIcon && <CloseModalButton onClick={closeModal} width="45" height="45" />}
            {modal.id === 'login' && modal.visible && <LoginModal onClose={closeModal} />}
            {modal.id === 'register' && modal.visible && <RegisterModal onFinish={onFinish} />}
          </div>
        </CreateModal>
      )}
    </>
  );
};

export default Modal;
