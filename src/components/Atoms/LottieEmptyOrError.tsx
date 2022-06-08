import styled from 'styled-components';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import LottieEmptyJson from '@src/assets/lottie/empty.json';
import LottieErrorJson from '@src/assets/lottie/error.json';

type LottieType = 'error' | 'empty';

const lottieMaps = new Map([
  ['error', LottieErrorJson as any],
  ['empty', LottieEmptyJson],
]);

type Props = {
  type: LottieType;
  message: string | null | React.ReactNode;
};

const LottieEmptyOrError = ({ type, message }: Props) => {
  const emptyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (emptyRef.current) {
      lottie.loadAnimation({
        container: emptyRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: lottieMaps.get(type) || LottieEmptyJson,
      });
    }
  }, [type]);

  return (
    <Container>
      <EmptyAnimationDiv ref={emptyRef} />
      <EmptyText>{message}</EmptyText>
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

const EmptyAnimationDiv = styled.div``;

const EmptyText = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 500;
  font-size: 16px;
`;

export default LottieEmptyOrError;
