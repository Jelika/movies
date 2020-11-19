import "./style.css";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

/** Global constants section */
const infoContainer = document.querySelector(".info");
const spinner = document.querySelector(".spinner-border");
const formComponent = document.querySelector(".form-group");
const closeButton = document.querySelector(".clear-input-btn");
const inputField =  document.querySelector("#input");
const yearSelector= document.querySelector('#selectElementId');
const filmListSwiper = new Swiper(".swiper-container", {
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
});
/** */

let pageNumber = 1;
let queryYear='';

window.onload = function () {
  getMovieInfo("Dream", 1);
  generateDropDownYears();
};

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

function generateDropDownYears(){
    const min = 2020, max = 1960,
   
    select = document.getElementById('selectElementId');
    let optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.innerHTML='';
    select.appendChild(optionDefault);
    
    for (let i = max; i<=min; i++){
       let option = document.createElement('option');
       option.value = i;
       option.innerHTML = i;
       select.appendChild(option);
    }
    yearSelector.addEventListener('click',()=>{
        queryYear= yearSelector.options[yearSelector.selectedIndex].text;
        });
}

function submitClick() {
  let keyWord =inputField.value;
  let regexLang = /(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])/;
  let regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;

  if (keyWord !== "") {
    if (regexLang.exec(keyWord)) {
      pageNumber = 1;
      if (regexLangRus.exec(keyWord)) {
        getTranslateWord(keyWord, pageNumber, true);
      } else {
        getMovieInfo(keyWord, pageNumber, true);
        infoContainer.innerText = `Showing results for '${keyWord}'`;
      }
      filmListSwiper.slideTo(0);
    } else infoContainer.innerText = `No results for ${keyWord}`;
  }
}

function getMovieInfo(keyWord, page, shouldTranslate) {
    console.log(`https://www.omdbapi.com/?s=${keyWord}&page=${page}&y=${queryYear}&apikey=e1ab60a9`);
  const url = `https://www.omdbapi.com/?s=${keyWord}&page=${page}&y=${queryYear}&apikey=e1ab60a9`;
  spinner.classList.remove("d-none");

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

function createSlide(poster, year, title, imdbID, imdbRating) {
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

function getTranslateWord(word, page, shouldTranslate) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200505T162523Z.33ff202967427e1b.2d537f5864213fe73f92105d302ab7486efc9940&text=${word}&lang=ru-en`;
  fetch(url)
    .then((response) => response.json())
    .then((date) => {
      console.log(date), date.text.join("");
    })
    .then((word) => {
      if (shouldTranslate === true) {
        getMovieInfo(word, page, shouldTranslate);
      } else getMovieInfo(word, page);
      infoContainer.innerText = `Showing results for ${word}`;
    });
}
