import React from 'react';
import styled from 'styled-components';

interface Props {
  thumbnail: any;
}
const Thumbnail = ({ thumbnail }: Props) => {
  return (
    <Container thumbnail={thumbnail}>
      {<Image thumbnail={thumbnail} src={thumbnail ?? 'https://avatars.githubusercontent.com/u/65433256?v=4'} />}
    </Container>
  );
};

export default Thumbnail;

const Container = styled.div<{ thumbnail?: string }>`
  display: flex;
  width: 100%;
  height: ${({ thumbnail }) => thumbnail && '257px'};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: ${({ thumbnail }) => !thumbnail && '5%'};
`;

const Image = styled.img<{ thumbnail?: string }>`
  width: ${({ thumbnail }) => (thumbnail ? '100%' : '40px')};
  height: ${({ thumbnail }) => (thumbnail ? '100%' : '40px')};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
