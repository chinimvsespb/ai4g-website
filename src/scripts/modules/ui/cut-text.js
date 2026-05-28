// Модуль для обрезки текста в карточках техник на странице technics.html
export function cutText() {
  const texts = document.querySelectorAll(".swiper-item__text");
  texts.forEach((text) => {
    if (text.textContent.length > 709) text.textContent = text.textContent.slice(0, 709) + "...";
  });
}
