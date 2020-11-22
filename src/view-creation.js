import { submitClick } from "./functionality-model";
import { getMovieInfo } from "./functionality-model";
import { getTranslateWord } from "./functionality-model";
import Swiper from "swiper";

/** Global constants section */
export const globalConstants = {
  infoContainer: document.querySelector(".info"),
  spinner: document.querySelector(".spinner-border"),
  formComponent: document.querySelector(".form-group"),
  closeButton: document.querySelector(".clear-input-btn"),
  inputField: document.querySelector("#input"),
  yearSelector: document.querySelector("#selectElementId"),
  filmListSwiper: new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 10,
    direction: "horizontal",
    initialSlide: 0,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
      clickable: true,
      dynamicMainBullets: 10,
    },
  }),
};
/** */

/** Global variables section */
export let variables = {
  pageNumber: 1,
  queryYear: "",
};
/** */

export function createSlide(poster, year, title, imdbID, imdbRating) {
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

              globalConstants.filmListSwiper.appendSlide(slide);
              globalConstants.filmListSwiper.update();
  globalConstants.spinner.classList.add("d-none");
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
  globalConstants.yearSelector.addEventListener("click", () => {
    // eslint-disable-next-line
    variables.queryYear = globalConstants.yearSelector.options[globalConstants.yearSelector.selectedIndex].text;
  });
}

export function addListeners() {
  globalConstants.formComponent.addEventListener("submit", (event) => {
    event.preventDefault();
    submitClick();
  });

  globalConstants.closeButton.addEventListener("click", () => {
    globalConstants.inputField.value = "";
    globalConstants.closeButton.classList.add("d-none");
  });

  globalConstants.inputField.addEventListener("keyup", () => {
    if (globalConstants.inputField.value) {
      globalConstants.closeButton.classList.remove("d-none");
    } else {
      globalConstants.closeButton.classList.add("d-none");
    }
  });

  globalConstants.filmListSwiper.on("init", () => {
    globalConstants.filmListSwiper.slideTo(0);
  });

  globalConstants.filmListSwiper.on("slideChange", () => {
    const regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;
    const preloadFilms = globalConstants.filmListSwiper.activeIndex % 6 === 0;
    if (preloadFilms && globalConstants.filmListSwiper.activeIndex != 0) {
      const keyWord = document.querySelector("#input").value;
      variables.pageNumber += 1;
      if (regexLangRus.exec(keyWord)) {
        getTranslateWord(keyWord, variables.pageNumber);
      } else {
        getMovieInfo(keyWord, variables.pageNumber);
      }
    }
  });
}
