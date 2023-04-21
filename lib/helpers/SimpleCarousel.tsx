import { FC } from 'react';
import React, { useRef, useState } from "react";
// Import Swiper React components
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import SwiperCore, { EffectCube, Pagination } from "swiper";


interface SimpleCarouselProps {
  images: string[];
}

// install Swiper modules
SwiperCore.use([Pagination]);


export const SimpleCarousel: FC<SimpleCarouselProps> = ({ images }) => {
  return (
    <div className="app-container">
      <div className="relative">
      <Swiper
         pagination={{
            dynamicBullets: true,
          }}
        className="mySwiper"
      >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img className="w-full h-96 sm:h-auto" src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SimpleCarousel;
