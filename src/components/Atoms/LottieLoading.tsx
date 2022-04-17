import styled from 'styled-components';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import LottieLoadingJson from '@src/assets/lottie/loading-spinner.json';

const LottieLoading = () => {
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

  return <Container ref={loadingRef}></Container>;
};

const Container = styled.div`
  width: 300px;
  height: 300px;
`;

export default LottieLoading;
