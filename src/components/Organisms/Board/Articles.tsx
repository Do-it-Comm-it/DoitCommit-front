import React from 'react';
import { useTheme } from 'styled-components';
import DIText from '@src/components/Atoms/DIText';
import PopularSlider from '@src/components/Molecules/Board/PopularSlider';
import MainArticle from './MainArticle';

type Props = {
  search?: string;
  tagType?: number;
};

const Articles = (props: Props) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <DIText
        fontColor={theme.colors.gray.gray950}
        fontWeight={700}
        fontSize={24}
      >
        🔥 가장 인기있는 아티클
      </DIText>
      <PopularSlider />

      <MainArticle {...props} />
    </React.Fragment>
  );
};

export default Articles;
