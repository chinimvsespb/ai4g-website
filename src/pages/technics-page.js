// Файл: src/pages/technics-page.js

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // ЭЛЕМЕНТЫ
  // =========================
  const sortDropdown = document.querySelector(".sort__dropdown");
  const cardsContainer = document.querySelector(".technics-main__body");
  const noCardsPlaceholder = document.getElementById("no-cards-placeholder");

  if (!sortDropdown || !cardsContainer) {
    console.warn("Не найдены необходимые элементы");
    return;
  }

  const sortSelected = sortDropdown.querySelector(".sort__selected");
  const sortSelectedArrow = sortDropdown.querySelector(".sort__selected-arrow");
  const sortOptions = sortDropdown.querySelector(".sort__options");
  const sortOptionElements = sortDropdown.querySelectorAll(".sort__option");

  // =========================
  // СОСТОЯНИЕ
  // =========================
  let activeCategory = null;
  let activeTimeRange = null;
  let activeSortOrder = "default";

  // =========================
  // URL PARAMS (с нормализацией "all" → null)
  // =========================
  const urlParams = new URLSearchParams(window.location.search);
  const rawCategory = urlParams.get("category");
  const rawTime = urlParams.get("time");

  activeCategory = rawCategory && rawCategory !== "all" ? rawCategory : null;
  activeTimeRange = rawTime && rawTime !== "all" ? rawTime : null;

  // =========================
  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  // =========================
  function updateActiveClass(element, elements) {
    elements.forEach((opt) => opt.classList.remove("active"));
    element.classList.add("active");
    updateSortSelected(element);
  }

  function updateSortSelected(option) {
    const selectedSpan = sortSelected?.querySelector("span");
    if (selectedSpan) {
      selectedSpan.textContent = option.querySelector("span")?.textContent || "По умолчанию";
    }
    const value = option.dataset.value;
    if (sortSelectedArrow) {
      sortSelectedArrow.style.display = value !== "default" ? "inline-block" : "none";
      sortSelectedArrow.classList.toggle("sort__option_02", value === "desc");
    }
  }

  function getTimeRange(minutes) {
    const mins = parseInt(minutes, 10);
    if (mins < 10) return "lt10";
    if (mins >= 10 && mins < 30) return "10-30";
    if (mins >= 30 && mins < 60) return "30-60";
    return "60+";
  }

  // Обновление URL без перезагрузки
  function updateURL() {
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);
    if (activeTimeRange) params.set("time", activeTimeRange);
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    history.replaceState(null, "", newUrl);
  }

  // Показать/скрыть кнопку сброса
  function updateResetButtonVisibility() {
    const resetButton = document.querySelector('.reset-filter[data-reset="all"]');
    if (resetButton) {
      resetButton.style.display = activeCategory || activeTimeRange ? "inline-block" : "none";
    }
  }

  // Фильтрация карточек (DOM)
  function filterCards() {
    const cards = document.querySelectorAll(".card");
    let hasVisible = false;

    // Активные классы для кнопок фильтров
    document.querySelectorAll(".filter__btn").forEach((btn) => btn.classList.remove("active"));

    if (activeCategory) {
      const categoryBtn = document.querySelector(`.filter__btn[data-category="${activeCategory}"]`);
      if (categoryBtn) categoryBtn.classList.add("active");
    }
    if (activeTimeRange) {
      const timeBtn = document.querySelector(`.filter__btn[data-time="${activeTimeRange}"]`);
      if (timeBtn) timeBtn.classList.add("active");
    }

    cards.forEach((card) => {
      const cardCategory = card.dataset.tag;
      const cardTime = card.dataset.time;
      const categoryMatch = !activeCategory || cardCategory === activeCategory;
      const timeMatch = !activeTimeRange || cardTime === activeTimeRange;

      if (categoryMatch && timeMatch) {
        card.classList.remove("hidden");
        hasVisible = true;
      } else {
        card.classList.add("hidden");
      }
    });

    if (noCardsPlaceholder) {
      noCardsPlaceholder.style.display = hasVisible ? "none" : "block";
    }

    updateURL();
    updateResetButtonVisibility();
  }

  // Сортировка карточек (перестановка в DOM)
  function sortCards() {
    const cards = Array.from(cardsContainer.querySelectorAll(".card:not(.hidden)"));
    if (activeSortOrder === "default") {
      cards.sort((a, b) => parseInt(a.dataset.index, 10) - parseInt(b.dataset.index, 10));
    } else {
      cards.sort((a, b) => {
        const titleA = a.querySelector(".card__subtitle")?.textContent.trim().toLowerCase() || "";
        const titleB = b.querySelector(".card__subtitle")?.textContent.trim().toLowerCase() || "";
        return activeSortOrder === "asc" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      });
    }
    // Перемещаем отсортированные карточки в контейнер
    cards.forEach((card) => cardsContainer.appendChild(card));
  }

  // Полное обновление: фильтрация + сортировка
  function refresh() {
    filterCards();
    sortCards();
  }

  // =========================
  // ЗАГРУЗКА JSON И ОТРИСОВКА КАРТОЧЕК
  // =========================
  function loadAndRenderCards() {
    cardsContainer.innerHTML = '<div class="loading">Загрузка...</div>';

    fetch("/data/technics.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        cardsContainer.innerHTML = "";
        if (!data.length) {
          cardsContainer.innerHTML = "<p>Нет данных</p>";
          return;
        }

        data.forEach((item, index) => {
          const card = document.createElement("div");
          card.className = "card";
          card.dataset.tag = item.tag || "";
          card.dataset.time = getTimeRange(item.time);
          card.dataset.index = index;
          card.innerHTML = `
            <div class="card__body">
              <div class="card__top">
                <div class="card__img">
                  <img src="${item.image}" alt="${item.subtitle || ""}">
                </div>
                <h3 class="card__subtitle">${item.subtitle || ""}</h3>
                <div class="card__description">${item.description || ""}</div>
                <div class="card__category ${item.tag || ""}">${item.category || ""}</div>
              </div>
              <div class="card__time">${item.time || 0} мин</div>
              <a href="technic.html?slug=${item.slug}" class="card__link">Подробнее</a>
            </div>
          `;
          cardsContainer.appendChild(card);
        });

        // Синхронизация интерфейса после загрузки
        refresh();

        // Активировать опцию сортировки в дропдауне
        const defaultOption = sortDropdown.querySelector('.sort__option[data-value="default"]');
        if (defaultOption) updateActiveClass(defaultOption, sortOptionElements);
      })
      .catch((error) => {
        console.error("Ошибка загрузки:", error);
        cardsContainer.innerHTML = '<div class="error">Ошибка загрузки данных</div>';
      });
  }

  // =========================
  // СОБЫТИЯ
  // =========================
  // Дропдаун: открыть/закрыть
  sortSelected.addEventListener("click", (e) => {
    e.stopPropagation();
    sortOptions.style.display = sortOptions.style.display === "block" ? "none" : "block";
  });
  document.addEventListener("click", () => {
    sortOptions.style.display = "none";
  });

  // Выбор опции сортировки
  sortOptionElements.forEach((option) => {
    option.addEventListener("click", () => {
      const newOrder = option.dataset.value;
      if (newOrder === activeSortOrder) {
        sortOptions.style.display = "none";
        return;
      }
      activeSortOrder = newOrder;
      updateActiveClass(option, sortOptionElements);
      sortCards(); // только сортировка, фильтры не меняются
      sortOptions.style.display = "none";
    });
  });

  // Фильтры (категория и время)
  document.querySelectorAll(".filter__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      const timeRange = btn.dataset.time;

      if (category && category !== "all") {
        activeCategory = activeCategory === category ? null : category;
      } else if (category === "all") {
        activeCategory = null;
      }

      if (timeRange && timeRange !== "all") {
        activeTimeRange = activeTimeRange === timeRange ? null : timeRange;
      } else if (timeRange === "all") {
        activeTimeRange = null;
      }

      refresh();
    });
  });

  // Кнопка сброса всех фильтров
  const resetBtn = document.querySelector('.reset-filter[data-reset="all"]');
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      activeCategory = null;
      activeTimeRange = null;
      activeSortOrder = "default";

      // Сбросить активный класс в дропдауне
      const defaultOption = sortDropdown.querySelector('.sort__option[data-value="default"]');
      if (defaultOption) updateActiveClass(defaultOption, sortOptionElements);

      refresh();

      // Дополнительно убрать активные классы с кнопок фильтров (refresh уже делает это через filterCards)
    });
  }

  // Старт
  loadAndRenderCards();
});
