// scroll-up.js - Появление кнопки "Наверх" при прокрутке вниз и плавная прокрутка вверх при клике на кнопку

export function scrollUp() {
  const btn = document.querySelector(".scrollUp");

  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.classList.toggle("active", window.scrollY > 499);
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}