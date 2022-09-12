import { usePopularBoard } from '@src/hooks/useBoards';
import { IBoard } from '@src/typings/Board';
import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Carousel from 'react-material-ui-carousel'

const settings = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 2,
   slidesToScroll: 1,
 };

const PopularCard = () => {
  const {data:PopularBoards} = usePopularBoard(8); //limit Cnt
  return (
    // <Container>
    <Carousel
      NextIcon={<img src="http://random.com/next" />}
      PrevIcon={<img src="http://random.com/prev" />}
      next={() => console.log('dpgb')}
      navButtonsAlwaysVisible={true}
    >
      {PopularBoards?.map((b: IBoard, i: number) => (
        <Card
          board={b}
          key={i}
          category={null}
          search={''}
          isBookmark={false}
          isHome={false}
        />
        // <div>{i}</div>
      ))}
    </Carousel>
    // </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export default PopularCard;