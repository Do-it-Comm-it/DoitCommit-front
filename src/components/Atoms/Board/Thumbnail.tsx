import React from 'react';
import styled from 'styled-components';

interface Props {
  thumbnail: any;
}
const Thumbnail = ({ thumbnail }: Props) => {
  return (
    <Container>
      <Image src={thumbnail} />
    </Container>
  );
};

export default Thumbnail;

const Container = styled.div`
  width: 100%;
  height: 257px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
