import React,{useState} from "react";
import Dropdown from "../dropdown/dropdown";
import Search from "../search/search";
import styles from "./main.module.css";
import FilmSwiper from "../film-swiper/film-swiper";

const Main = () => {
  const [currentYearNumber, setCurrentYearNumber] = useState("");
  const [currentKeyWord, setCurrentKeyWord] = useState('home');
  return (
    <main>
      <Search setCurrentKeyWord={(w)=>setCurrentKeyWord(w)}/>
      <Dropdown setCurrentYearNumber={(y)=>setCurrentYearNumber(y)}/>
     <div className={styles.spinnerContainer}><div className="spinner-border text-primary d-none" role="status"></div></div>
      <p className={styles.info}>There are too many results. Start search!</p>
      <FilmSwiper currentKeyWord={currentKeyWord} currentYearNumber={currentYearNumber} />
      </main>
  );
};

export default Main;
