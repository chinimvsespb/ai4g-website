// Функция для отображения кнопки прокрутки вверх
function scrollUp2() {
  const scrollUp = document.querySelector(".scrollUp");
  window.addEventListener("scroll", () => {
    if (scrollY > 499) scrollUp.classList.add("active");
    else scrollUp.classList.remove("active");
  });
  scrollUp.addEventListener("click", () => {
    $("html, body").animate(
      {
        scrollTop: $("#top").offset().top,
      },
      "slow"
    );
  });
}

scrollUp2();

// Функция для анимации блока ".fairway__row-back" при прокрутке страницы
function showFairway1() {
  // Получаем элементы для анимации
  const fairwayBlock = document.querySelector(".fairway__row");
  const fairwayBlockBack = document.querySelector(".fairway__row-back");

  // Проверка на существование элементов перед добавлением обработчика событий.
  if (fairwayBlock && fairwayBlockBack) {
    // Запуск анимации сразу при загрузке страницы
    fairwayBlockBack.style.animation = "fairway 2.2s forwards";

    window.addEventListener("scroll", () => {
      // Вычисляем высоту и смещение блока
      const animItemHeight = fairwayBlock.offsetHeight;
      const animItemOffset = offset(fairwayBlock).top;
      const animStart = 4; // Коэффициент для определения точки начала анимации
      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      // Проверяем, находится ли блок в зоне видимости и запускаем анимацию
      if (window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight) {
        fairwayBlockBack.style.animation = "fairway 2.2s forwards";
      }
    });
  } else {
    console.error("Elements .fairway__row or .fairway__row-back not found!");
  }
}

showFairway1();

// Функция для получения позиции элемента на странице
function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}
