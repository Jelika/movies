"use strict";
import { globalConstants } from "./constants";
import { variables } from "./constants";
import { createSlide } from "./view-creation";

export function getTranslateWord(word, page, shouldTranslate) {
  var url =
    "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200505T162523Z.33ff202967427e1b.2d537f5864213fe73f92105d302ab7486efc9940&text=" +
    word +
    "&lang=ru-en";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (date) {
      return date.text.join("");
    })
    .then(function (word) {
      if (shouldTranslate === true) {
        getMovieInfo(word, page, shouldTranslate);
      } else {
        getMovieInfo(word, page);
      }
      globalConstants.infoContainer.innerText = "Showing results for " + word;
    });
}

export function getMovieInfo(keyWord, page, shouldTranslate) {
  var url =
    "https://www.omdbapi.com/?s=" +
    keyWord +
    "&page=" +
    page +
    "&y=" +
    variables.queryYear +
    "&apikey=e1ab60a9";
  globalConstants.spinner.classList.remove("d-none");
  console.log(url);
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (date) {
      if (date.Response === "True") {
        if (shouldTranslate) {
          globalConstants.filmListSwiper.removeAllSlides();
          globalConstants.filmListSwiper.update();
        }
        date.Search.forEach(function (element) {
          var poster = element.Poster === "N/A" ? "" : element.Poster;
          var year = element.Year;
          var title = element.Title;
          var imdbID = element.imdbID;
          var urlRating =
            "https://www.omdbapi.com/?i=" + imdbID + "&apikey=e1ab60a9";
          fetch(urlRating)
            .then(function (result) {
              return result.json();
            })
            .then(function (res) {
              var imdbRating = res.imdbRating;
              createSlide(poster, year, title, imdbID, imdbRating);
            });
        });
      } else {
        globalConstants.spinner.classList.add("d-none");
        console.log("Error: ", date.Error);
        globalConstants.infoContainer.innerText = date.Error;
      }
    });
}

export function searchClick() {
  var keyWord = globalConstants.inputField.value;
  var regexLang = /(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])/;
  var regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;

  if (keyWord !== "") {
    if (regexLang.exec(keyWord)) {
      variables.pageNumber = 1;
      if (regexLangRus.exec(keyWord)) {
        getTranslateWord(keyWord, variables.pageNumber, true);
      } else {
        getMovieInfo(keyWord, variables.pageNumber, true);
        globalConstants.infoContainer.innerText =
          'Showing results for "' + keyWord + '"';
      }
      globalConstants.filmListSwiper.slideTo(0);
    } else {
      globalConstants.infoContainer.innerText =
        'No results for "' + keyWord + '"';
    }
  }
}
