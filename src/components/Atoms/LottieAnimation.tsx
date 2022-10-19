import styled from 'styled-components';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import LottieEmptyJson from '@src/assets/lottie/empty.json';
import LottieErrorJson from '@src/assets/lottie/error.json';
import LottieLoadingJson from '@src/assets/lottie/loading-spinner.json';

type LottieType = 'error' | 'empty' | 'loading';

const lottieMaps = new Map([
  ['error', LottieErrorJson as any],
  ['empty', LottieEmptyJson],
  ['loading', LottieLoadingJson],
]);

type Props = {
  width?: number;
  height?: number;
  type: LottieType;
  message?: string | null | React.ReactNode;
};

const LottieAnimation = ({ width, height, type, message }: Props) => {
  const emptyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (emptyRef.current) {
      lottie.loadAnimation({
        container: emptyRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: lottieMaps.get(type) || LottieErrorJson,
      });
    }
  }, [type]);

  return (
    <Container width={width} height={height}>
      <EmptyAnimationDiv ref={emptyRef} />
      {message ? <EmptyText>{message}</EmptyText> : null}
    </Container>
  );
};

const Container = styled.div<{ width?: number; height?: number }>`
  width: ${({ width }) => width || 300}px;
  height: ${({ height }) => height || 300}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const EmptyAnimationDiv = styled.div``;

const EmptyText = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  font-weight: 500;
  font-size: 15px;
`;

export default LottieAnimation;
