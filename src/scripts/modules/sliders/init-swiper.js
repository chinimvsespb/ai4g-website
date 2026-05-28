import Swiper from "swiper";
import "swiper/css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

Swiper.use([Navigation, Pagination, Autoplay]);

export function initSwiper() {
  if (!document.querySelector(".swiper")) return;

  new Swiper(".swiper", {
    speed: 400,
    spaceBetween: 50,
    slidesPerView: 1,
    allowTouchMove: false,

    navigation: {
      nextEl: ".swiper-arrows .swiper-button-next",
      prevEl: ".swiper-arrows .swiper-button-prev",
    },
  });
}