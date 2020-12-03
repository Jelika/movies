"use strict";
import Swiper from "swiper";

/** Global constants section */
export var globalConstants = {
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
export var variables = {
  pageNumber: 1,
  queryYear: "",
};
/** */
