import ContentBox from '@src/components/Molecules/ContentBox';
import React from 'react';
import BannerImage from '@src/assets/banner1.svg';
import styled from 'styled-components';

const Banner = () => {
  return (
    <ContentBox contentWidth={900} minHeight={270} contentHeight={400}>
      <BannerItem />
    </ContentBox>
  );
};

const BannerItem = styled(BannerImage)`
  width: 100%;
  height: 100%;
`;

export default Banner;
