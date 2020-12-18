import React, { useState, useRef } from "react";
import Dropdown from "../dropdown/dropdown";
import Search from "../search/search";
import styles from "./main.module.css";
import FilmSwiper from "../film-swiper/film-swiper";

const Main = () => {
  const [currentYearNumber, setCurrentYearNumber] = useState("");
  const [currentKeyWord, setCurrentKeyWord] = useState("home");
  const info = useRef(null);

  return (
    <main>
      <Search setCurrentKeyWord={(word) => setCurrentKeyWord(word)} />
      <Dropdown setCurrentYearNumber={(year) => setCurrentYearNumber(year)} />
      <p ref={info} className={styles.info}>
        There are too many results. Start search!
      </p>
      <FilmSwiper
        info={info}
        currentKeyWord={currentKeyWord}
        currentYearNumber={currentYearNumber}
      />
    </main>
  );
};

export default Main;
