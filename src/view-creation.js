import { globalConstants } from "./index";
import { variables } from "./index";
import { submitClick } from "./functionality-model";
import { getMovieInfo } from "./functionality-model";
import { getTranslateWord } from "./functionality-model";

const {
  spinner,
  closeButton,
  formComponent,
  inputField,
  yearSelector,
  filmListSwiper,
} = globalConstants;

let { pageNumber, queryYear } = variables;

export function createSlide(poster, year, title, imdbID, imdbRating) {

       // eslint-disable-next-line
       debugger;
  let slide = `
              <div class="swiper-slide" style="width: 492px; margin-right: 30px;">
                  <div class="card">
                      <div class="slide=main">
                          <img class="poster card-img-top" src="${poster}" alt="${title}" onerror="this.onerror=null; this.src='http://dummyimage.com/300x400/99cccc.gif&text=No+poster';" /></div>
                          <div class="footer-card">
                              <a href="https://www.imdb.com/title/${imdbID}/" class="link-card"><p class="title">${title}</p></a>
                              <div class="movie-info">
                                  <span class="year">${year}</span>
                                  <img class="film-star" src="assets/img/star.png" >
                                  <span class="MDb"><a class="film-rating">IMDb:${imdbRating}</a></span>
                              </div>
                          </div>
                  </div>
              </div>`;

  filmListSwiper.appendSlide(slide);
  filmListSwiper.update();
  spinner.classList.add("d-none");
}

export function generateDropDownYears() {
  const min = 2020,
    max = 1960,
    select = document.getElementById("selectElementId");
  let optionDefault = document.createElement("option");
  optionDefault.value = "";
  optionDefault.innerHTML = "";
  select.appendChild(optionDefault);

  for (let i = max; i <= min; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
  }
  yearSelector.addEventListener("click", () => {
    // eslint-disable-next-line
    queryYear = yearSelector.options[yearSelector.selectedIndex].text;
  });
}
export const addListeners = () => {
  formComponent.addEventListener("submit", (event) => {
    event.preventDefault();
    submitClick();
  });

  closeButton.addEventListener("click", () => {
    inputField.value = "";
    closeButton.classList.add("d-none");
  });

  inputField.addEventListener("keyup", () => {
    if (inputField.value) {
      closeButton.classList.remove("d-none");
    } else {
      closeButton.classList.add("d-none");
    }
  });

  filmListSwiper.on("init", () => {
    filmListSwiper.slideTo(0);
  });

  filmListSwiper.on("slideChange", () => {
    const regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;
    const preloadFilms = filmListSwiper.activeIndex % 6 === 0;
    if (preloadFilms && filmListSwiper.activeIndex != 0) {
      const keyWord = document.querySelector("#input").value;
      pageNumber += 1;
      if (regexLangRus.exec(keyWord)) {
        getTranslateWord(keyWord, pageNumber);
      } else {
        getMovieInfo(keyWord, pageNumber);
      }
    }
  });
};
