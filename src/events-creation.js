import { globalConstants } from "./constants";
import { variables } from "./constants";
import {searchClick} from "./functionality";
import { getMovieInfo } from "./functionality";
import { getTranslateWord } from "./functionality";

export function addListeners() {
    globalConstants.formComponent.addEventListener("submit", (event) => {
      event.preventDefault();
      searchClick();
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
  