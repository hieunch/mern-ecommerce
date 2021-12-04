/**
 *
 * Carousel
 *
 */

import React from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ProductSlider = props => {
  const {
    swipeable,
    draggable,
    showDots,
    infinite,
    autoPlay,
    keyBoardControl,
    autoPlaySpeed,
    ssr,
    responsive,
    children
  } = props;

  return (
    <Carousel
      swipeable={swipeable}
      draggable={draggable}
      showDots={showDots}
      infinite={infinite}
      autoPlay={autoPlay}
      keyBoardControl={keyBoardControl}
      autoPlaySpeed={autoPlaySpeed}
      ssr={ssr}
      responsive={responsive}
      customTransition='all 1s'
      transitionDuration={500}
      containerClass='carousel-container'
      dotListClass='carousel-dot-list-style'
      // itemClass='carousel-slider-item'
      itemClass="carousel-item-padding-40-px"
    >
      {children}
    </Carousel>
  );
};

ProductSlider.defaultProps = {
  swipeable: false,
  draggable: false,
  showDots: false,
  infinite: true,
  autoPlay: false,
  keyBoardControl: true,
  ssr: false,
  autoPlaySpeed: 5000
};

export default ProductSlider;
