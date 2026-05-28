// src/pages/vozmozhnosti-page.js
import Swiper from "swiper";
import "swiper/css";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";

Swiper.use([Navigation, FreeMode, Mousewheel]);

(async function () {
  const filtersScroll = document.getElementById("filters-scroll");
  const categoriesContainer = document.getElementById("categories-container");

  if (!filtersScroll || !categoriesContainer) return;

  categoriesContainer.innerHTML = '<div class="vozmozhnosti__loading">Загрузка…</div>';

  try {
    const response = await fetch("/data/vozmozhnosti.json");
    if (!response.ok) throw new Error("Ошибка загрузки");
    const categoriesData = await response.json();
    renderPage(categoriesData);
  } catch (err) {
    categoriesContainer.innerHTML = '<div class="vozmozhnosti__error">Не удалось загрузить данные</div>';
    console.error(err);
  }

  function renderPage(categories) {
    categoriesContainer.innerHTML = "";

    // Создаём чипсы
    const chipsFragment = document.createDocumentFragment();
    const sectionsFragment = document.createDocumentFragment();

    categories.forEach((cat) => {
      const section = buildCategorySection(cat);
      sectionsFragment.appendChild(section);

      const chip = document.createElement("a");
      chip.className = "vozmozhnosti__filter-chip swiper-slide";
      chip.href = `#category-${cat.id}`;
      chip.textContent = cat.title;
      chip.setAttribute("aria-label", `Перейти к категории ${cat.title}`);
      chipsFragment.appendChild(chip);
    });

    filtersScroll.appendChild(chipsFragment);
    categoriesContainer.appendChild(sectionsFragment);

    // Инициализируем Swiper
    initFilterSwiper();
    observeActiveCategory();
    enhanceAnchorScrolling();
  }

  function initFilterSwiper() {
    const swiper = new Swiper(".vozmozhnosti__filters", {
      modules: [FreeMode, Navigation, Mousewheel],
      slidesPerView: "auto", // Показывать сколько влезет
      spaceBetween: 12,
      freeMode: {
        enabled: true,
        momentum: true,
        sticky: false,
      },
      loop: false, // ОТКЛЮЧИТЬ loop!
      centeredSlides: false,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 0.5,
      },
      navigation: {
        nextEl: ".vozmozhnosti__filters .vozmozhnosti__scroll-btn--right",
        prevEl: ".vozmozhnosti__filters .vozmozhnosti__scroll-btn--left",
      },
      breakpoints: {
        768: {
          spaceBetween: 10,
        },
      },
    });
  }

  function buildCategorySection(cat) {
    const section = document.createElement("section");
    section.id = `category-${cat.id}`;
    section.className = "vozmozhnosti__category-section";
    section.setAttribute("aria-labelledby", `cat-title-${cat.id}`);

    const headerHTML = `
      <div class="vozmozhnosti__category-header">
        <h2 class="vozmozhnosti__category-title" id="cat-title-${cat.id}">${cat.subtitle}</h2>
        <p class="vozmozhnosti__category-toptext">${cat.topText}</p>
        <p class="vozmozhnosti__category-desc">${cat.description}</p>
      </div>
    `;

    const itemsHTML = cat.items
      .map(
        (item) => `
      <div class="vozmozhnosti__item">
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
        <div class="vozmozhnosti__text">
          <h3 class="vozmozhnosti__name">${item.name}</h3>
          <div class="vozmozhnosti__item-desc">${item.desc}</div>
        </div>
      </div>
    `,
      )
      .join("");

    section.innerHTML = headerHTML + `<div class="vozmozhnosti__grid">${itemsHTML}</div>`;
    return section;
  }

  function observeActiveCategory() {
    const sections = document.querySelectorAll(".vozmozhnosti__category-section");
    const allChips = document.querySelectorAll(".vozmozhnosti__filter-chip");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            allChips.forEach((chip) => {
              chip.classList.remove("active");
              chip.removeAttribute("aria-current");
            });

            const targetHref = `#${id}`;
            const targetChip = Array.from(allChips).find((chip) => chip.getAttribute("href") === targetHref && !chip.classList.contains("swiper-slide-duplicate"));

            if (targetChip) {
              targetChip.classList.add("active");
              targetChip.setAttribute("aria-current", "true");
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
  }

  function enhanceAnchorScrolling() {
    document.querySelectorAll(".vozmozhnosti__filter-chip").forEach((chip) => {
      chip.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      });
    });
  }
})();
