"use strict";

/**Import section */
require("./style.css");
require("swiper/swiper-bundle.css");
var  getMovieInfo = require('./functionality').getMovieInfo;
var generateDropDownYears = require('./view-creation').generateDropDownYears;
var   addListeners = require('./events-creation').addListeners;
/** */

window.onload = function () {
  getMovieInfo("Home", 1);
  generateDropDownYears();
  addListeners();
};
