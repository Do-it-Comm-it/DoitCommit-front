import { usePopularBoard } from '@src/hooks/useBoards';
import { IBoard } from '@src/typings/Board';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import './slick.css';
import PCard from './PopularCard';
import ArrowSVG from '@src/assets/arrow.svg';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/**
 * @Link https://react-slick.neostack.com/docs/get-started
 */
const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
};

const PopularSlider = () => {
  const sliderRef = useRef<any>(null);
  const { data: PopularBoards } = usePopularBoard(8); //limit Cnt
  return (
    <Container>
      <Arrow
        onClick={() => {
          sliderRef.current.slickPrev();
        }}
        style={{
          position: 'absolute',
          top: '45%',
          left: 10,
          transform: 'rotate(180deg)',
        }}
      />
      <Arrow
        onClick={() => {
          sliderRef.current.slickNext();
        }}
        style={{ position: 'absolute', top: '45%', right: 10 }}
      />
      <StyledSlider
        {...settings}
        dotsClass="popular-css"
        arrows={false}
        ref={sliderRef}
      >
        {PopularBoards?.map((b: IBoard, i: number) => (
          <PCard
            board={b}
            key={i}
            category={null}
            search={''}
            isBookmark={false}
            isHome={false}
            isPopular={true}
          />
        ))}
      </StyledSlider>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 30px 0;
  width: 100%;
  max-height: 400px;
`;

const Arrow = styled(ArrowSVG)`
  position: absolute;
  cursor: pointer;
  top: 45%;
  z-index: 1;
`;

const StyledSlider = styled(Slider)``;

export default PopularSlider;
