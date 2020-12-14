import React, { useState, useEffect } from "react";
import styles from "./film-swiper.module.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const FilmSwiper = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlides, setCurrentSlides] = useState(null);
  const spinner = document.querySelector(".spinnerContainer");
  const infoContainer = document.querySelector(".info");

  function createSlide(poster, year, title, imdbID, imdbRating) {
    let slide = 
    <div className="swiper-slide" >
        <div className="card">
            <div className="slide-main">
                <img className="poster card-img-top" src="${poster}" alt="${title}" onerror="this.onError=null; this.src='http://dummyimage.com/300x400/99cccc.gif&text=No+poster';" />
                </div>
                <div className="footer-card">
                    <a href="https://www.imdb.com/title/${imdbID}/" className="link-card"><p class="title">${title}</p></a>
                    <div className="movie-info">
                        <span className="year">${year}</span>
                        <img className="film-star" src="assets/img/star.png" />
                        <span className="MDb"><a className="film-rating">IMDb:${imdbRating}</a></span>
                    </div>
                </div>
            </div>
    </div>;
    setSlides(slides.push(slide));
    if (slides.length === 9) {
      slides.map((slideContent, index) => {
        <SwiperSlide key={index} virtualIndex={index}>
          {slideContent}
        </SwiperSlide>;
      });
      setCurrentSlides(slides);
    }
    console.log("my", slides);
  }
  function getMovieInfo(keyWord, page, queryYear) {
    const url = `https://www.omdbapi.com/?s=${keyWord}&page=${page}&y=${queryYear}&apikey=e1ab60a9`;
    if (spinner) {
      spinner.classList.remove("d-none");
    }
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((date) => {
        if (date.Response === "True") {
          date.Search.forEach((element) => {
            let poster = element.Poster === "N/A" ? "" : element.Poster;
            let year = element.Year;
            let title = element.Title;
            let imdbID = element.imdbID;
            const urlRating = `https://www.omdbapi.com/?i=${imdbID}&apikey=e1ab60a9`;
            fetch(urlRating)
              .then((result) => result.json())
              .then((res) => {
                let imdbRating = res.imdbRating;
                createSlide(poster, year, title, imdbID, imdbRating);
                if (infoContainer) {
                  infoContainer.innerText = `Showing results for ${keyWord}`;
                }
              });
          });
        } else {
          spinner.classList.add("d-none");
          console.log(`Error: ${date.Error}`);
          infoContainer.innerText = `${date.Error}`;
        }
      });
  }
  useEffect(() => {
    getMovieInfo("home", 1, "");
  }, []);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      //onReachEnd={() => {reachEnd}}
    >
      {currentSlides}
    </Swiper>
  );

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
  {
    /* <div className="wrapper-slider">
      <div className="slider">
        <div className="swiper-container swiper-container-initialized swiper-container-horizontal" style="cursor: grab;">
          <div className="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;">
          </div>
          <div className="swiper-btn swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide"
            aria-disabled="false"></div>
          <div className="swiper-btn swiper-button-next" tabindex="0" role="button" aria-label="Next slide"
            aria-disabled="false"></div>
          <div className="swiper-scrollbar"></div>
        </div>
      </div>
      </div> */
  }
  //   );
};

export default FilmSwiper;
