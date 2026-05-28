import { initAnimations } from '../modules/init-animations.js';
import { offset, isValidEmail } from '../modules/utils.js';
import { scrollUp } from '../modules/scroll-up.js';
import { formValidation } from '../modules/form-validation.js';
import { btnValidation } from '../modules/btn-validation.js';

document.addEventListener("DOMContentLoaded", function () {
  function animateSolution(containerSelector, itemSelector, initialDelay, itemDelay, threshold) {
    const items = document.querySelectorAll(itemSelector);
    const showItems = () => {
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * itemDelay);
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(showItems, initialDelay);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
      }
    );
    const container = document.querySelector(containerSelector);
    observer.observe(container);
  }

  function animateServiceItems() {
    const items = document.querySelectorAll(".servise-session__item");
    const decorImg = document.querySelector(".servise-session__decor-img");
    if (items.length > 0 && decorImg) {
      items.forEach((item, index) => {
        const img = item.querySelector(".servise-session__img");
        const block = item.querySelector(".servise-session__block");
        setTimeout(() => {
          img.classList.add("show");
        }, 300 * index);
        setTimeout(() => {
          block.classList.add("show");
        }, 300 * index + 300);
      });
      setTimeout(() => {
        decorImg.classList.add("show");
      }, 300 * items.length + 200);
    }
  }

  const serviceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            animateServiceItems();
          }, 100);
          serviceObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  const serviceContainer = document.querySelector(".session__servise");
  animateSolution(".session__solution", ".solution__item", 500, 200, 0.1);
  setTimeout(() => {
    serviceObserver.observe(serviceContainer);
  }, 500 + 300 * document.querySelectorAll(".solution__item").length + 200);
});

/* Анимация ------------------------------------------*/
initAnimations();
/*  ------------------------------------------*/

formValidation();
btnValidation();

// Валидация формы оплаты в продуктах (аналогична formValidation)
function formValidationPayment() {
  const validation = new JustValidate(".payment__form");

  // Маска для телефона
  const inputMask = new Inputmask("+7 (999) 999-99-99");
  const telSelector = document.querySelector(".payment__phone");
  inputMask.mask(telSelector);

  validation
    .addField(".payment__name", [
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Имя должно состоять минимум из 2 символов",
      },
      {
        rule: "maxLength",
        value: 50,
        errorMessage: "Имя не должно превышать 50 символов",
      },
      {
        rule: "required",
        errorMessage: "Введите имя",
      },
    ])
    .addField(".payment__phone", [
      {
        rule: "required",
        errorMessage: "Введите телефон",
      },
    ])
    .addField(".payment__email", [
      {
        rule: "required",
        errorMessage: "Введите электронную почту",
      },
      {
        rule: "email",
        errorMessage: "Введите корректную электронную почту",
      },
    ])
    .onSuccess((event) => {
      event.target.submit(); // Отправка формы без открытия нового окна
    });
}

// Функция для активации кнопки отправки формы оплаты при заполнении полей
function btnValidationPayment() {
  const btn = document.querySelector(".payment__btn");
  const inputName = document.querySelector(".payment__name");
  const inputPhone = document.querySelector(".payment__phone");
  const inputEmail = document.querySelector(".payment__email");

  inputName.addEventListener("input", checkLength);
  inputPhone.addEventListener("input", checkLength);
  inputEmail.addEventListener("input", checkLength);

  function checkLength() {
    if (inputName.value.length > 1 && inputPhone.value.length > 1 && inputEmail.value.length > 1 && isValidEmail(inputEmail.value)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }
}

formValidationPayment();
btnValidationPayment();

// Функция для плавной прокрутки вверх
scrollUp();

function animateNgLine() {
  // Получаем элементы: контейнер линии и само изображение.
  const ngLine = document.querySelector(".ng-line"); // Весь блок
  const ngLineBg = document.querySelector(".ng-line-bg"); // Изображение линии

  // Проверяем наличие элементов перед добавлением логики
  if (ngLine && ngLineBg) {
    // Слушаем событие прокрутки
    window.addEventListener("scroll", () => {
      // Вычисляем размеры и позицию элемента относительно страницы
      const animItemHeight = ngLine.offsetHeight;
      const animItemOffset = offset(ngLine).top;
      const animStart = 4; // Коэффициент видимости анимации
      const animItemPoint = window.innerHeight - animItemHeight / animStart;

      // Условие: блок (линию) видно => запускаем анимацию
      if (window.scrollY > animItemOffset - animItemPoint && window.scrollY < animItemOffset + animItemHeight) {
        ngLineBg.classList.add("active"); // Добавляем класс, запускаем анимацию
      } else {
        ngLineBg.classList.remove("active"); // Убираем класс, если блок больше не виден
      }
    });
  } else {
    console.error("Element .ng-line or .ng-line-bg not found!");
  }
}

// Запуск анимации для линии
animateNgLine();

// Настройка Swiper
const swiper = new Swiper(".my-slider", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 2000,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 5,
    },
  },
});
