import React from 'react';
import styled from 'styled-components';

interface Props {
  thumbnail?: string | null;
  writerImageUrl?: string | null;
}
const Thumbnail = ({ thumbnail, writerImageUrl }: Props) => {
  return (
    <Container thumbnail={thumbnail}>
      {<Image thumbnail={thumbnail} src={thumbnail || writerImageUrl || ''} />}
    </Container>
  );
};

export default Thumbnail;

const Container = styled.div<{ thumbnail?: string | null }>`
  display: flex;
  width: 100%;
  height: ${({ thumbnail }) => thumbnail && '257px'};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: ${({ thumbnail }) => !thumbnail && '5%'};
  padding-bottom: 0;
`;

const Image = styled.img<{ thumbnail?: string | null }>`
  width: ${({ thumbnail }) => (thumbnail ? '100%' : '40px')};
  height: ${({ thumbnail }) => (thumbnail ? '100%' : '40px')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
