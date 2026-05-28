
// Анимация в блоке "Наши партнёры"
import { offset } from '../offset.js';

export function partnersAnim() {
  const partnersBlock = document.querySelector(".partners__items");
  const block1 = document.querySelector(".pi-1");
  const block2 = document.querySelector(".pi-2");
  const block3 = document.querySelector(".pi-3");

  if (partnersBlock && block1 && block2 && block3) {
    window.addEventListener("scroll", () => {
      const animItemHeight = partnersBlock.offsetHeight;
      const animItemOffset = offset(partnersBlock).top;
      const animStart = 4;
      const animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (
        window.scrollY > animItemOffset - animItemPoint &&
        window.scrollY < animItemOffset + animItemHeight
      ) {
        block1.style.animation = "pi-anim-1 0.5s forwards";
        block2.style.animation = "pi-anim-2 0.5s forwards";
        block2.style.animationDelay = "0.5s";
        block3.style.animation = "pi-anim-3 0.5s forwards";
        block3.style.animationDelay = "1s";
      } else {
        block1.style.animation = "";
        block2.style.animation = "";
        block2.style.animationDelay = "";
        block3.style.animation = "";
        block3.style.animationDelay = "";
      }
    });
  }
}