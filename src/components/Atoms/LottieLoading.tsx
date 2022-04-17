import styled from 'styled-components';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import LottieLoadingJson from '@src/assets/lottie/loading-spinner.json';

type Props = {
  width?: number;
  height?: number;
};

const LottieLoading = ({ width, height }: Props) => {
  const loadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loadingRef.current) {
      lottie.loadAnimation({
        container: loadingRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: LottieLoadingJson,
      });
    }
  }, []);

  return <Container width={width} height={height} ref={loadingRef}></Container>;
};

const Container = styled.div<{ width?: number; height?: number }>`
  width: ${({ width }) => width || 300}px;
  height: ${({ height }) => height || 300}px;
`;

export default LottieLoading;
