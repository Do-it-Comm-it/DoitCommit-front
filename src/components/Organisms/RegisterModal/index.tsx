import DIButton from '@src/components/Atoms/DIButton';
import DIText from '@src/components/Atoms/DIText';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import DIInput from '../../Atoms/DIInput';
import Modal from '../Modal';

const RegisterModal = () => {
  const [page, setPage] = useState<number>(0);

  const onChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  return (
    <Modal>
      <Container>
        {page === 0 && (
          <Wrapper>
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
            <DIButton
              value={'다음'}
              onClick={() => {
                onChangePage(1);
              }}
            />
          </Wrapper>
        )}
        {page === 1 && (
          <Wrapper>
            <DIText fontColor={'#AACD06'} fontSize={22}>
              반갑습니다. user 님
            </DIText>
            <InputWrapper style={{ color: '#353535', marginTop: '44px', fontSize: '18px' }}>
              <DIText>사용중인 기술이나 관심있는 태그를 설정해주세요.</DIText>
              <InputWrapper></InputWrapper>
            </InputWrapper>
          </Wrapper>
        )}
        {page === 2 && (
          <Wrapper>
            <DIText fontColor={'#AACD06'} fontSize={22}>
              반갑습니다. user 님
            </DIText>
            <InputWrapper style={{ color: '#353535', marginTop: '44px', fontSize: '18px' }}>
              <DIText>이미지를 설정해주세요.</DIText>
            </InputWrapper>
          </Wrapper>
        )}
      </Container>
    </Modal>
  );
};
const Container = styled.div``;
const Wrapper = styled.div``;
const InputWrapper = styled.div``;
export default RegisterModal;
