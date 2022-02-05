import ContentBox from '@src/components/Molecules/ContentBox';
import React from 'react';
import BannerImage from '@src/assets/banner1.svg';
import styled from 'styled-components';
import { devices } from '@src/utils/theme';

const AdBanner = () => {
  return (
    <ContentBox>
      <Banner />
    </ContentBox>
  );
};

const Banner = styled(BannerImage)`
  margin-top: 50px;
  width: 100%;
  box-shadow: 0px 0px 20px rgba(143, 146, 148, 0.1);
  border-radius: 10px;
`;

export default AdBanner;
