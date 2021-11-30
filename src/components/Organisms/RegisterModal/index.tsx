import DIText from '@src/components/Atoms/DIText';
import React from 'react';
import styled from 'styled-components';
import DIInput from '../../Atoms/DIInput';
import Modal from '../Modal';

const RegisterModal = () => {
  return (
    <Modal id="register">
      <Container>
        <DIText fontColor={'#AACD06'} fontSize={22}>
          두잇커밋에 처음 오셧군요!
        </DIText>
        <InputWrapper style={{ color: '#353535', marginTop: '44px', fontSize: '18px' }}>
          <DIText>우선, 앞으로 사용하실 닉네임을 정해주세요.</DIText>
          <InputWrapper>
            <DIText>닉네임</DIText>
            <DIInput onChange={() => {}} />
          </InputWrapper>
        </InputWrapper>
      </Container>
    </Modal>
  );
};
const Container = styled.div``;
const InputWrapper = styled.div``;
export default RegisterModal;
