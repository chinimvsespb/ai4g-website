// Модуль для анимации блоков на странице index.html в разделе "choice" "Ai4G выбирают"

import { offset } from "../offset.js";

export function choiceAnim() {
  const choiceBlock = document.querySelector(".choice__items");
  const block1 = document.querySelector(".ci-1");
  const block2 = document.querySelector(".ci-2");
  const block3 = document.querySelector(".ci-3");

  if (choiceBlock && block1 && block2 && block3) {
    window.addEventListener("scroll", () => {
      const animItemHeight = choiceBlock.offsetHeight;
      const animItemOffset = offset(choiceBlock).top;
      const animStart = 4;
      const animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight) {
        block1.style.animation = "ci-1 0.5s forwards";
        block2.style.animation = "ci-2 0.5s forwards";
        block2.style.animationDelay = "0.5s";
        block3.style.animation = "ci-3 0.5s forwards";
        block3.style.animationDelay = "1s";
      } else {
        block1.style.animation = "";
        block2.style.animation = "";
        block3.style.animation = "";
      }
    });
  }
}
