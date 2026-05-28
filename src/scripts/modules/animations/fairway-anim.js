// Модуль для анимации блока "фарватер Ai4G" на странице index.html
import { offset } from "../offset.js";

export function fairwayAnim() {
  const fairwayBlock = document.querySelector(".fairway__row");
  const fairwayBlockBack = document.querySelector(".fairway__row-back");
  if (fairwayBlock && fairwayBlockBack) {
    window.addEventListener("scroll", () => {
      const animItemHeight = fairwayBlock.offsetHeight;
      const animItemOffset = offset(fairwayBlock).top;
      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight) {
        fairwayBlockBack.style.animation = "fairway 2.2s forwards";
      }
    });
  }
}
