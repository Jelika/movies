"use strict";
import "./style.css";
import "swiper/swiper-bundle.css";
import { getMovieInfo } from "./functionality";
import { generateDropDownYears } from "./view-creation";
import { addListeners } from "./events-creation";

window.onload = function () {
  getMovieInfo("Dream", 1);
  generateDropDownYears();
  addListeners();
};
