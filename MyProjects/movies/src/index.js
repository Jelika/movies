import './style.css'
//import Swiper from '../node_modules/swiper/js/swiper'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.css'
//import { showKeyboard } from './js/keyboard.js'

let pageNumber = 1;
let info = document.querySelector('.info');
const posterNotFound = '';
const spiner = document.querySelector('.spinner-border');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();
recognition.interimResults = false;


window.onload = function () {
   // showKeyboard();
    getMovieInfo('Dream', 1);
}

let mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 10,
    direction: 'horizontal',
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
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
        dynamicMainBullets: 10,
    }
});

mySwiper.on('init', () => {
    mySwiper.slideTo(0);
});


document.querySelector('.keyboard-input-btn').addEventListener('click', () => {
    document.querySelector('.wrapper').classList.toggle('d-none');
})

document.querySelector('.form-group').addEventListener('submit', (event) => {
    event.preventDefault();
    submitClick();

})

document.querySelector('.clear-input-btn').addEventListener('click', () => {
    document.querySelector('#input').value = "";
})

const isNewWord = true;
export function submitClick() {
    let keyWord = document.querySelector('#input').value;
    let regexLang = /(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])/;
    let regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;
    if (keyWord !== '') {
        if (regexLang.exec(keyWord)) {
            pageNumber = 1;
            if (regexLangRus.exec(keyWord)) { getTranslateWord(keyWord, pageNumber, isNewWord) } else {
                getMovieInfo(keyWord, pageNumber, isNewWord);
                info.innerText = `Showing results for '${keyWord}'`;
            }
            mySwiper.slideTo(0);

        } else info.innerText = `No results for ${keyWord}`;
    }
}

function getMovieInfo(keyWord, page, bool) {
    const url = `https://www.omdbapi.com/?s=${keyWord}&page=${page}&apikey=e1ab60a9`;
    spiner.classList.remove('d-none');
    fetch(url)
        .then(response => response.json())
        .then(date => {
            if (date.Response === 'True') {
                if (bool === true) {
                    mySwiper.removeAllSlides();
                    mySwiper.update()
                }
                date.Search.forEach((element) => {
                    let poster = element.Poster === 'N/A' ? posterNotFound : element.Poster;
                    let year = element.Year;
                    let title = element.Title;
                    let imdbID = element.imdbID;
                    const urlRating = `https://www.omdbapi.com/?i=${imdbID}&apikey=e1ab60a9`;
                    fetch(urlRating)
                        .then(result => result.json())
                        .then(res => {
                            let imdbRating = res.imdbRating;
                            createSlide(poster, year, title, imdbID, imdbRating);
                        })
                })
            } else {
                spiner.classList.add('d-none');
                console.log(`Ошибка: ${date.Error}`);
                info.innerText = `${date.Error}`;
            }
        })
}

function createSlide(poster, year, title, imdbID, imdbRaiting) {
    let slide =
        `<div class="swiper-slide" style="width: 492px; margin-right: 30px;">
                <div class="card">
                <div class="slide=main">
                <img class="poster card-img-top" src="${poster}" alt="${title}" onerror="this.onerror=null; this.src='http://dummyimage.com/300x400/99cccc.gif&text=No+poster';" /></div>
                <div class="footer-card">
                <a href="https://www.imdb.com/title/${imdbID}/" class="link-card"><p class="title">${title}</p></a>
                <div class="movie-info">
                <span class="year">${year}</span>
               <img class="film-star" src="assets/img/star.png" >
                <span class="MDb"><a class="film-rating">IMDb:${imdbRaiting}</a></span>
                </div>
                </div>
                </div>
                </div>`
    mySwiper.appendSlide(slide);
    mySwiper.update();
    spiner.classList.add('d-none');
}

mySwiper.on('slideChange', () => {
    let regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;
    if (mySwiper.activeIndex % 6 === 0 && mySwiper.activeIndex != 0) {
        let keyWord = document.querySelector('#input').value;
        pageNumber += 1;
        if (regexLangRus.exec(keyWord)) { getTranslateWord(keyWord, pageNumber) }
        else
            getMovieInfo(keyWord, pageNumber);
    }
})

function getTranslateWord(word, page, bool) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200505T162523Z.33ff202967427e1b.2d537f5864213fe73f92105d302ab7486efc9940&text=${word}&lang=ru-en`
    fetch(url)
        .then(response => response.json())
        .then(date => date.text.join(''))
        .then((word) => {
            if (bool === true) { getMovieInfo(word, page, bool) } else getMovieInfo(word, page);
            info.innerText = `Showing results for ${word}`;
        })
}


document.querySelector('.speak-btn').addEventListener('click', () => {
    document.querySelector('#input').value = "";
    recognition.start();
})

recognition.addEventListener('result', event => {
    let transcript = Array.from(event.results).map((result) => result[0]).map((result) => result.transcript).join('');
    document.querySelector('#input').value = transcript;
    submitClick()
})