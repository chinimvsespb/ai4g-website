// modules/menu.js - Логика для основного меню и подменю (открытие/закрытие, клики вне меню)
export function initMenu() {
  const menuToggle = document.querySelector(".icon-menu");
  const menuBody = document.querySelector(".menu__body");

  // Открыть/закрыть основное меню
  function toggleMenu() {
    document.documentElement.classList.toggle("menu-open");
  }

  // Открыть/закрыть подменю по клику
  function handleDropdownClick(e) {
    e.preventDefault();
    const parentItem = this.closest(".menu__item--dropdown");
    const submenu = parentItem?.querySelector(".submenu");

    if (!submenu) return;

    const expanded = parentItem.classList.toggle("active");
    submenu.style.display = expanded ? "block" : "none";
  }

  // Закрыть всё меню, если клик вне меню
  function handleOutsideClick(e) {
    if (
      menuBody &&
      !menuBody.contains(e.target) &&
      menuToggle &&
      !menuToggle.contains(e.target)
    ) {
      document.documentElement.classList.remove("menu-open");
    }

    // Закрываем все открытые подменю, если клик вне них
    document
      .querySelectorAll(".menu__item--dropdown.active")
      .forEach((item) => {
        if (!item.contains(e.target)) {
          item.classList.remove("active");
          const submenu = item.querySelector(".submenu");
          if (submenu) submenu.style.display = "none";
        }
      });
  }

  // Вешаем обработчики
  function setEventListeners() {
    // Основное меню
    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMenu);
    }

    // Подменю
    document
      .querySelectorAll(".menu__link--dropdown")
      .forEach((link) => {
        link.addEventListener("click", handleDropdownClick);
      });

    // Клик вне (делегирование)
    document.addEventListener("click", handleOutsideClick);
  }

  setEventListeners();
}