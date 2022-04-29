import styled from 'styled-components';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import LottieErrorJson from '@src/assets/lottie/error.json';

type Props = {
  errorMessage: string | null;
};

const LottieError = ({ errorMessage }: Props) => {
  const errorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (errorRef.current) {
      lottie.loadAnimation({
        container: errorRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: LottieErrorJson,
      });
    }
  }, []);

  return (
    <Container>
      <ErrorAnimationDiv ref={errorRef} />
      <ErrorText>{errorMessage}</ErrorText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
`;
const ErrorAnimationDiv = styled.div``;
const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 500;
  font-size: 18px;
`;
export default LottieError;
