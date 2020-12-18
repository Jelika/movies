export function getMovieInfo(keyWord, page, queryYear, cb) {
  let spinner = document.querySelector(".spinner-border");
  let infoContainer = document.querySelector(".info");
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
              createSlide(poster, year, title, imdbID, imdbRating, cb);
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

export function createSlide(poster, year, title, imdbID, imdbRating, cb) {
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
}
