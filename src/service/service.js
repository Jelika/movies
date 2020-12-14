// export function getTranslateWord(word, page, shouldTranslate) {
//     const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200505T162523Z.33ff202967427e1b.2d537f5864213fe73f92105d302ab7486efc9940&text=${word}&lang=ru-en`;
//     fetch(url)
//       .then((response) => response.json())
//       .then((date) => {
//        date.text.join("");
//       })
//       .then((word) => {
//         if (shouldTranslate === true) {
//           getMovieInfo(word, page, shouldTranslate);
//         } else getMovieInfo(word, page);
//         infoContainer.innerText = `Showing results for ${word}`;
//       });
//   }
  
  export function getMovieInfo(keyWord, page,queryYear, cb) {
    let spinner=document.querySelector(".spinner-border");
    let infoContainer= document.querySelector(".info");
    const url = `https://www.omdbapi.com/?s=${keyWord}&page=${page}&y=${queryYear}&apikey=e1ab60a9`;
    spinner.classList.remove("d-none");
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((date) => {
        if (date.Response === "True") {
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
                createSlide(poster, year, title, imdbID, imdbRating,cb);
                infoContainer.innerText = `Showing results for ${keyWord}`;
              });
          });
        } else {
          spinner.classList.add("d-none");
          console.log(`Error: ${date.Error}`);
          infoContainer.innerText = `${date.Error}`;
        }
      });
  }
  
//   export function searchClick() {
//     let keyWord = inputField.value;
//     let regexLang = /(^[А-я0-9\s]+)(?!.*[A-z])$|(^[A-z0-9\s]+)(?!.*[А-я])/;
//     let regexLangRus = /(^[А-я0-9\s]+)(?!.*[A-z])/;
  
//     if (keyWord !== "") {
//       if (regexLang.exec(keyWord)) {
//         variables.pageNumber = 1;
//         if (regexLangRus.exec(keyWord)) {
//           getTranslateWord(keyWord, variables.pageNumber, true);
//         } else {
//           getMovieInfo(keyWord, variables.pageNumber, true);
//           infoContainer.innerText = `Showing results for '${keyWord}'`;
//         }
//         filmListSwiper.slideTo(0);
//       } else infoContainer.innerText = `No results for ${keyWord}`;
//     }
//   }

  export function createSlide(poster, year, title, imdbID, imdbRating,cb) {
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
  return cb(...slide);
    //             globalConstants.filmListSwiper.appendSlide(slide);
    //             globalConstants.filmListSwiper.update();
    // globalConstants.spinner.classList.add("d-none");
  }