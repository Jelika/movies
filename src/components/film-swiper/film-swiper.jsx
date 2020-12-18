import React, { useState, useEffect } from "react";
import styles from "./film-swiper.module.css";
import star from "../../assets/star.png";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const FilmSwiper = ({ currentYearNumber, currentKeyWord, info }) => {
  const [currSlides, setCurrSlides] = useState(null);
  const infoContainer = document.querySelector(".info");
  const noPoster = "http://dummyimage.com/300x400/99cccc.gif&text=No+poster";

  function createSlides(newSlides) {
    const slideItems = newSlides.map((slideProp, index) => (
      <SwiperSlide key={index} virtualIndex={index}>
        <div className="swiper-slide">
          <div className={styles.card}>
            <div className="slide-main">
              <img
                className={(styles["poster"], styles["card-img-top"])}
                src={slideProp.posterProp || noPoster}
                alt={slideProp.titleProp}
              />
            </div>
            <div className="footer-card">
              <a href={slideProp.imdbIdUrlProp} className={styles["link-card"]}>
                <p className="title">{slideProp.titleProp}</p>
              </a>
              <div className="movie-info">
                <span className={styles.year}>{slideProp.yearProp}</span>
                <img className={styles["film-star"]} alt="star" src={star} />
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
  }

  function getMovieInfo(keyWord, page, queryYear) {
    setCurrSlides(null);
    let newSlides = [];
    const url = `https://www.omdbapi.com/?s=${keyWord}&page=${page}&y=${queryYear}&apikey=e1ab60a9`;
    //setSpinnerIsVisible(true);
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
                newSlides.push(filmCardObject);

                if (newSlides.length >= 10) {
                  createSlides(newSlides);
                }

                info.current.innerText = `Showing results for ${keyWord}`;
              });
          });
        } else {
          // setSpinnerIsVisible(false);
          console.log(`Error: ${date.Error}`);
          info.current.innerText = `${date.Error}`;
          setTimeout(() => {
            getMovieInfo("home", 1, currentYearNumber);
          }, 2000);
        }
      });
  }

  useEffect(() => {
    getMovieInfo(currentKeyWord, 1, currentYearNumber);
  }, [currentKeyWord, currentYearNumber]);

  return (
    <Swiper
      spaceBetween={10}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {currSlides ? currSlides : null}
    </Swiper>
  );
};

export default FilmSwiper;
