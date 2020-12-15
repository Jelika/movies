import React, { useState, useEffect } from "react";
import styles from "./film-swiper.module.css";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const FilmSwiper = ({ currentYearNumber, currentKeyWord }) => {
  const [slides, setSlides] = useState([]);
  const [currSlides, setCurrSlides] = useState(null);
  const spinner = document.querySelector(".spinnerContainer");
  const infoContainer = document.querySelector(".info");

  function createSlides() {
    const slideItems = Array.from(slides).map((slideProp, index) => (
      <SwiperSlide key={index} virtualIndex={index}>
        <div className="swiper-slide">
          <div className={styles.card}>
            <div className="slide-main">
              <img
                className={(styles["poster"], styles["card-img-top"])}
                src={slideProp.posterProp}
                alt={slideProp.titleProp}
                onerror="this.onError=null; this.src='http://dummyimage.com/300x400/99cccc.gif&text=No+poster';"
              />
            </div>
            <div className="footer-card">
              <a href={slideProp.imdbIdUrlProp} className={styles["link-card"]}>
                <p className="title">{slideProp.titleProp}</p>
              </a>
              <div className="movie-info">
                <span className={styles.year}>{slideProp.yearProp}</span>
                <img
                  className={styles["film-star"]}
                  alt="star"
                  src="assets/img/star.png"
                />
                <span className={styles["MDb"]}>
                  <a
                    href={slideProp.imdbIdUrlProp}
                    className={styles["film-rating"]}
                  >
                    IMDb:{slideProp.imdbRatingProp}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));
    setCurrSlides(slideItems);
    console.log("currebtS", currSlides);
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
                let filmCardObject = {
                  posterProp: poster,
                  yearProp: year,
                  titleProp: title,
                  imdbIdUrlProp: `https://www.imdb.com/title/${imdbID}/`,
                  imdbRatingProp: res.imdbRating,
                };
                setSlides(slides.push(filmCardObject));

                if (slides.length >= 9) {
                  createSlides();
                }
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
    getMovieInfo(currentKeyWord, 1, currentYearNumber);
  }, []);

  useEffect(() => {
    setSlides([]);
    setCurrSlides(null);
    console.log("слово", currentKeyWord);
    getMovieInfo(currentKeyWord, 1, currentYearNumber);
  }, [currentKeyWord]);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {currSlides ? currSlides : null}
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
};

export default FilmSwiper;
