import React from 'react';
import Modal from '../Modal';
import GoogleLogin from '../GoogleLogin';
import GithubLogin from '../GithubLogin';

const LoginModal = () => {
  return (
    <Modal id="login">
      <div>
        <p style={{ color: '#AACD06', marginTop: '86px', fontSize: '30px', fontWeight: 700 }}>두잇커밋</p>
        <div style={{ color: '#353535', marginTop: '44px', fontSize: '18px' }}>
          <div>아직 두잇커밋 회원이 아니신가요?</div>
          <div>
            소셜계정으로 간편하게 <span style={{ color: '#AACD06', fontWeight: 'bold' }}>로그인</span> 하세요
          </div>
        </div>
        <GoogleLogin />
        <GithubLogin />
      </div>
    </Modal>
  );
};

export default LoginModal;
