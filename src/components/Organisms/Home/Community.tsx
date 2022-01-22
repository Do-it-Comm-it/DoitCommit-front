import CommunityBox from '@src/components/Molecules/Community/CommunityBox';
import ContentBox from '@src/components/Molecules/ContentBox';
import React from 'react';
const Community = () => {
  return (
    <ContentBox title="커뮤니티" contentWidth={400} requiredHeader>
      <CommunityBox
        body={'CSS2와 CSS3의 가장 큰 차이점은 CSS3...'}
        isMarked={false}
        subTitle={'CSS2와 CSS3의 차이점'}
        tech={'PHP'}
        title={'전예진 UX UI 디자이너'}
      />
      <CommunityBox
        body={'CSS2와 CSS3의 가장 큰 차이점은 CSS3...'}
        isMarked={true}
        subTitle={'CSS2와 CSS3의 차이점'}
        tech={'CSS'}
        title={'전예진 UX UI 디자이너'}
      />
    </ContentBox>
  );
};
export default Community;
