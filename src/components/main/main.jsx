import React from "react";
import Dropdown from "../dropdown/dropdown";
import Search from "../search/search";
import styles from "./main.module.css";
import FilmSwiper from "../film-swiper/film-swiper";

const Main = () => {
  return (
    <main>
      <Search />
      <Dropdown/>
     <div className={styles.spinnerContainer}><div className="spinner-border text-primary d-none" role="status"></div></div>
      <p className={styles.info}>There are too many results. Start search!</p>
      <FilmSwiper />
      </main>
  );
};

export default Main;
