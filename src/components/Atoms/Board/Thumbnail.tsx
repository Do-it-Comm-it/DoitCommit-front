import React from 'react';
import styled from 'styled-components';

const Thumbnail = () => {
  return (
    <Container>
      <Image src="https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg" />
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
