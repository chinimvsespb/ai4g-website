// src/pages/serf-session-page.js

document.addEventListener("DOMContentLoaded", function () {
  // Учёт системных настроек анимации
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Функция для анимации элементов с классом _anim-items
  function animateOnScroll() {
    const animItems = document.querySelectorAll("._anim-items");
    if (!animItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("_active");
            observer.unobserve(entry.target); // отключаем наблюдение после активации
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    ); // чуть ниже края экрана

    animItems.forEach((item) => observer.observe(item));
  }

  // Если анимация отключена в системе – сразу показываем все элементы
  if (prefersReducedMotion) {
    document.querySelectorAll("._anim-items").forEach((el) => el.classList.add("_active"));
  } else {
    animateOnScroll();
  }

  // Дополнительно: анимация для элементов, которые могут появиться динамически,
  // но на этой странице всё статично, достаточно одного вызова.
});
