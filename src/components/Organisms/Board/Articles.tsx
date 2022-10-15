import React from 'react';
import { useTheme } from 'styled-components';
import DIText from '@src/components/Atoms/DIText';
import PopularSlider from '@src/components/Molecules/Board/PopularSlider';
import MainArticle from './MainArticle';
import { useRecoilValue } from 'recoil';
import myBoardAtom from '@src/recoil/atom/myBoard';

type Props = {
  search?: string;
  tagType?: number;
};

const Articles = (props: Props) => {
  const theme = useTheme();
  const isShowBookmarkList = useRecoilValue(myBoardAtom); // 북마크조회가 아닐때는 기본 메인 아티클을 표시한다.
  return (
    <React.Fragment>
      {(isShowBookmarkList.bookmark || isShowBookmarkList.history) && (
        <MainArticle {...props} />
      )}
      {!isShowBookmarkList.bookmark && !isShowBookmarkList.history && (
        <>
          <DIText
            fontColor={theme.colors.gray.gray950}
            fontWeight={700}
            fontSize={24}
          >
            🔥 가장 인기있는 아티클
          </DIText>
          <PopularSlider />
          <MainArticle {...props} />
        </>
      )}
    </React.Fragment>
  );
};

export default Articles;
