import React from 'react';
import styled from 'styled-components';

interface Props {
  thumbnail?: string | null;
  writerImageUrl?: string | null;
}
const Thumbnail = ({ thumbnail, writerImageUrl }: Props) => {
  return (
    <>
      {thumbnail && (
        <>
        <Container thumbnail={thumbnail}>
            <Image
              thumbnail={thumbnail}
              src={thumbnail}
            />
        </Container>
        {/* padding 으로 인한 Container 분리 */}
        <Container>
          <Image
            src={writerImageUrl || ''}
          />
        </Container>
        </>
      )}
      {!thumbnail && (
        <Container>
          <Image
            src={writerImageUrl || ''}
          />
        </Container>
      )}
    </>
  );
};

export default Thumbnail;

const Container = styled.div<{ thumbnail?: string | null }>`
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: ${({ thumbnail }) => (!thumbnail && '4%')};
  padding-bottom: 0;
`;

const Image = styled.img<{ thumbnail?: string | null }>`
  width: ${({ thumbnail }) => (thumbnail ? '100%' : '40px')};
  height: ${({ thumbnail }) => (thumbnail ? '170px' : '40px')};
  border-radius: ${({ thumbnail }) => (thumbnail ? '10px 10px 0 0' : '10px')};
`;
