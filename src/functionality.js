import { globalConstants } from "./constants";
import { variables } from "./constants";
import { createSlide } from "./view-creation";

const { infoContainer, spinner, inputField, filmListSwiper } = globalConstants;

//let { pageNumber, queryYear } = variables;

export function getTranslateWord(word, page, shouldTranslate) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200505T162523Z.33ff202967427e1b.2d537f5864213fe73f92105d302ab7486efc9940&text=${word}&lang=ru-en`;
  fetch(url)
    .then((response) => response.json())
    .then((date) => {
     date.text.join("");
    })
    .then((word) => {
      if (shouldTranslate === true) {
        getMovieInfo(word, page, shouldTranslate);
      } else getMovieInfo(word, page);
      infoContainer.innerText = `Showing results for ${word}`;
    });
}

export function getMovieInfo(keyWord, page, shouldTranslate) {
  const url = `https://www.omdbapi.com/?s=${keyWord}&page=${page}&y=${variables.queryYear}&apikey=e1ab60a9`;
  spinner.classList.remove("d-none");
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((date) => {
      if (date.Response === "True") {
        if (shouldTranslate === true) {
          filmListSwiper.removeAllSlides();
          filmListSwiper.update();
        }
        date.Search.forEach((element) => {
          let poster = element.Poster === "N/A" ? "" : element.Poster;
          let year = element.Year;
          let title = element.Title;
          let imdbID = element.imdbID;
          const urlRating = `https://www.omdbapi.com/?i=${imdbID}&apikey=e1ab60a9`;
          fetch(urlRating)
            .then((result) => result.json())
            .then((res) => {
              let imdbRating = res.imdbRating;
              createSlide(poster, year, title, imdbID, imdbRating);
            });
        });
      } else {
        spinner.classList.add("d-none");
        console.log(`Error: ${date.Error}`);
        infoContainer.innerText = `${date.Error}`;
      }
    });
}

export function searchClick() {
  let keyWord = inputField.value;
  let regexLang = /(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])/;
  let regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;

  if (keyWord !== "") {
    if (regexLang.exec(keyWord)) {
      variables.pageNumber = 1;
      if (regexLangRus.exec(keyWord)) {
        getTranslateWord(keyWord, variables.pageNumber, true);
      } else {
        getMovieInfo(keyWord, variables.pageNumber, true);
        infoContainer.innerText = `Showing results for '${keyWord}'`;
      }
      filmListSwiper.slideTo(0);
    } else infoContainer.innerText = `No results for ${keyWord}`;
  }
}

