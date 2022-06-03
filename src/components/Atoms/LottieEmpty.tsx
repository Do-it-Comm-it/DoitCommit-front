import styled from 'styled-components';
import lottie from 'lottie-web';
import React, { useEffect, useRef } from 'react';
import LottieEmptyJson from '@src/assets/lottie/empty.json';

type Props = {
  emptyMessage: string | null;
};

const LottieEmpty = ({ emptyMessage }: Props) => {
  const emptyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (emptyRef.current) {
      lottie.loadAnimation({
        container: emptyRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: LottieEmptyJson,
      });
    }
  }, []);

  return (
    <Container>
      <EmptyAnimationDiv ref={emptyRef} />
      <EmptyText>{emptyMessage}</EmptyText>
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

export default LottieEmpty;
