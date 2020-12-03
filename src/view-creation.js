'use strict';
import { globalConstants } from "./constants";
import { variables } from "./constants";

export function createSlide(poster, year, title, imdbID, imdbRating) {
  var slide = '<div class="swiper-slide" style="width: 492px; margin-right: 30px;">'+
                  '<div class="card">'+
                      '<div class="slide=main">'+
                         '<img class="poster card-img-top" src="'+poster+'" alt="'+title+'" onerror="this.onerror=null; this.src="http://dummyimage.com/300x400/99cccc.gif&text=No+poster";" /></div>'+
                          '<div class="footer-card">'+
                             '<a href="https://www.imdb.com/title/'+imdbID+'/" class="link-card"><p class="title">'+title+'</p></a>'+
                              '<div class="movie-info">'+
                                '  <span class="year">'+year+'</span>'+
                                  '<img class="film-star" src="assets/img/star.png" >'+
                                 ' <span class="MDb"><a class="film-rating">IMDb:'+imdbRating+'</a></span>'+
                            '</div>'+
                         ' </div>'+
                  '</div>'+
             ' </div>';

  globalConstants.filmListSwiper.appendSlide(slide);
  globalConstants.filmListSwiper.update();
  globalConstants.spinner.classList.add("d-none");
}

export function generateDropDownYears() {
  var min = 2020,
  max = 1960,
  select = document.getElementById("selectElementId"),
  optionDefault = document.createElement("option");
  optionDefault.value = "";
  optionDefault.innerHTML = "";
  select.appendChild(optionDefault);

  for (var i = max; i <= min; i++) {
    var option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
  }
  globalConstants.yearSelector.addEventListener("click", function(){
    // eslint-disable-next-line
    variables.queryYear = globalConstants.yearSelector.options[globalConstants.yearSelector.selectedIndex].text;
  });
}


