// Анимация в блоке "Наставники"

import { offset } from "../offset.js";

export function mentorsAnim() {
  const mentorsBlock = document.querySelector(".mentors__line");
  const mentorsBg = document.querySelector(".mentors__line-bg-2");
  if (mentorsBlock && mentorsBg) {
    window.addEventListener("scroll", () => {
      const animItemHeight = mentorsBlock.offsetHeight;
      const animItemOffset = offset(mentorsBlock).top;
      const animStart = 4;
      const animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight) {
        mentorsBg.classList.add("active");
      } else {
        mentorsBg.classList.remove("active");
      }
    });
  }
}
