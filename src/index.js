import "./style.css";
import "swiper/swiper-bundle.css";
import {getMovieInfo} from "./functionality-model";
import {generateDropDownYears,addListeners} from "./view-creation";

window.onload = () => {
  getMovieInfo("Dream", 1);
  generateDropDownYears();
  addListeners();
};
