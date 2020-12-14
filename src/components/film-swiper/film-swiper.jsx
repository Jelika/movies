import React from "react";
//import styles from "./film-swiper.module.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const FilmSwiper = () => {
    return(
    <Swiper
    spaceBetween={10}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    onSwiper={(swiper) => console.log(swiper)}
    onSlideChange={() => console.log('slide change')}
  >
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>
  </Swiper>
    )

//     const filmSwiper = new Swiper(".swiper-container", {
//         slidesPerView: 1,
//         spaceBetween: 10,
//         direction: "horizontal",
//         initialSlide: 0,
//         breakpoints: {
//           320: {
//             slidesPerView: 1,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 30,
//           },
    
//           1200: {
//             slidesPerView: 3,
//             spaceBetween: 20,
//           },
//         },
//         navigation: {
//           nextEl: ".swiper-button-next",
//           prevEl: ".swiper-button-prev",
//         },
//         pagination: {
//           el: ".swiper-pagination",
//           dynamicBullets: true,
//           clickable: true,
//           dynamicMainBullets: 10,
//         },
//       });

//   return (
// <div className="wrapper-slider">
//       <div className="slider">
//         <div className="swiper-container swiper-container-initialized swiper-container-horizontal" style="cursor: grab;">
//           <div className="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
//           </div>
//           <div className="swiper-btn swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"
//             aria-disabled="false"></div>
//           <div className="swiper-btn swiper-button-next" tabindex="0" role="button" aria-label="Next slide"
//             aria-disabled="false"></div>
//           <div className="swiper-scrollbar"></div>
//         </div>
//       </div>
//       </div>
//   );
};

export default FilmSwiper;

