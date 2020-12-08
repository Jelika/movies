"use strict";

/**Import section */
var globalConstants = require('./constants').globalConstants;
var variables = require('./constants').variables;
var searchClick = require('./functionality').searchClick;
var  getMovieInfo = require('./functionality'). getMovieInfo;
var getTranslateWord = require('./functionality').getTranslateWord;
/** */

function addListeners() {
  globalConstants.formComponent.addEventListener("submit", function (event) {
    event.preventDefault();
    searchClick();
  });

  globalConstants.closeButton.addEventListener("click", function () {
    globalConstants.inputField.value = "";
    globalConstants.closeButton.classList.add("d-none");
  });

  globalConstants.inputField.addEventListener("keyup", function () {
    if (globalConstants.inputField.value) {
      globalConstants.closeButton.classList.remove("d-none");
    } else {
      globalConstants.closeButton.classList.add("d-none");
    }
  });

  globalConstants.filmListSwiper.on("init", function () {
    globalConstants.filmListSwiper.slideTo(0);
  });

  globalConstants.filmListSwiper.on("slideChange", function () {
    var regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;
    var preloadFilms = globalConstants.filmListSwiper.activeIndex % 6 === 0;
    if (preloadFilms && globalConstants.filmListSwiper.activeIndex != 0) {
      var keyWord = document.querySelector("#input").value;
      variables.pageNumber += 1;
      if (regexLangRus.exec(keyWord)) {
        getTranslateWord(keyWord, variables.pageNumber);
      } else {
        getMovieInfo(keyWord, variables.pageNumber);
      }
    }
  });
}
module.exports = {
  addListeners:addListeners,
};