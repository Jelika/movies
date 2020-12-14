import "./style.css";
import "swiper/swiper-bundle.css";
import {getMovieInfo} from "./functionality";
import {generateDropDownYears} from "./view-creation";
import {addListeners} from "./events-creation"

window.onload = () => {
  getMovieInfo("home", 1);
  generateDropDownYears();
  addListeners();
};

