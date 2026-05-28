// technic-page.js

document.addEventListener("DOMContentLoaded", async () => {
  const contentContainer = document.getElementById("technic-page");

  if (!contentContainer) return;

  // Получаем slug из URL
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  if (!slug) {
    renderError("Техника не найдена");
    return;
  }

  try {
    const response = await fetch("data/technics.json");

    if (!response.ok) {
      throw new Error(`Ошибка загрузки JSON: ${response.status}`);
    }

    const technics = await response.json();

    // Ищем технику
    const technic = technics.find((item) => item.slug === slug);

    if (!technic) {
      renderError("Техника не найдена");
      return;
    }

    renderTechnic(technic);

  } catch (error) {
    console.error(error);
    renderError("Ошибка загрузки страницы");
  }

  // =========================
  // RENDER PAGE
  // =========================

  function renderTechnic(item) {
    document.title = item.title || item.subtitle || "Техника развития";

    // -------------------------
    // Формирование списков
    // -------------------------

    function formatList(arr) {
      if (!arr || !arr.length) return "";

      // Если строка → превращаем в массив
      const list = Array.isArray(arr)
        ? arr
        : arr.split("\n").filter(Boolean);

      return `
        <ul>
          ${list
            .map((line) => `<li>${line.trim()}</li>`)
            .join("")}
        </ul>
      `;
    }

    // -------------------------
    // Формирование шагов
    // -------------------------

    function renderSteps(steps) {
      if (!steps || !steps.length) return "";

      return `
        <ol class="technics__steps">

          ${steps.map((step) => `
            <li>

              <div class="technics__step-text">
                ${step.text}
              </div>

              ${step.example ? `
                <div class="technics__example">
                  <strong>Пример:</strong>

                  <p>
                    ${step.example}
                  </p>
                </div>
              ` : ""}

            </li>
          `).join("")}

        </ol>
      `;
    }

    // -------------------------
    // Хештеги
    // -------------------------

    function formatHashtags(arr) {
      if (!arr || !arr.length) return "";

      return arr.map((tag) => `
        <a href="/technics.html?search=${encodeURIComponent(tag)}">
          #${tag}
        </a>
      `).join(" ");
    }

    // =========================
    // HTML
    // =========================

    contentContainer.innerHTML = `
      <section class="technics" id="top">

        <div class="technics__container">

          <!-- Хлебные крошки -->

          <ul class="technics__bread-crumbs">
            <li>
              <a href="../index.html">
                Главная
              </a>
            </li>

            <li>
              <a href="../technics.html">
                Техники
              </a>
            </li>

            <li>
              ${item.title || item.subtitle || ""}
            </li>
          </ul>

          <!-- Контент -->

          <div class="technics__body">

            <!-- Верх -->

            <div class="technics__top">

              <h1 class="technics__title">
                ${item.title || item.subtitle || ""}
              </h1>

              <div class="technics__img">
                <img
                  src="${item.image}"
                  alt="${item.title || item.subtitle || ""}"
                >
              </div>

            </div>

            <!-- Описание -->

            ${item.description ? `
              <div>

                <h2 class="technics__label label">
                  Описание:
                </h2>

                <p>
                  ${item.description}
                </p>

              </div>
            ` : ""}

            <!-- Категория -->

            ${item.category ? `
              <div>

                <h2 class="technics__label label">
                  Категория техники:
                </h2>

                <p>
                  ${item.category}
                </p>

              </div>
            ` : ""}

            <!-- Время -->

            ${(item.time || item.duration) ? `
              <div>

                <h2 class="technics__label label">
                  Время:
                </h2>

                <p>
                  ${item.time ? `${item.time} минут` : item.duration}
                </p>

              </div>
            ` : ""}

            <!-- Зачем -->

            ${item.why ? `
              <div>

                <h2 class="technics__label label">
                  Зачем:
                </h2>

                <div class="technics__content">
                  <p>
                    ${item.why}
                  </p>
                </div>

              </div>
            ` : ""}

            <!-- Как работает -->

            ${item.howWorks ? `
              <div>

                <h2 class="technics__label label">
                  Как это работает:
                </h2>

                <div class="technics__content">
                  <p>
                    ${item.howWorks}
                  </p>
                </div>

              </div>
            ` : ""}

            <!-- Шаги -->

            ${item.steps ? `
              <div>

                <h2 class="technics__label label">
                  Алгоритм выполнения:
                </h2>

                ${renderSteps(item.steps)}

              </div>
            ` : ""}

            <!-- Доп упражнения -->

            ${item.extraExercises ? `
              <div>

                <h2 class="technics__label label">
                  Дополнительные упражнения:
                </h2>

                <div class="technics__content">
                  ${formatList(item.extraExercises)}
                </div>

              </div>
            ` : ""}

            <!-- Литература -->

            ${item.literature ? `
              <div class="technics__catalog">

                <div class="technics__label label">
                  Почитать больше о технике:
                </div>

                ${formatList(item.literature)}

              </div>
            ` : ""}

            <!-- Рекомендуем -->

            ${item.recommendedReading ? `
              <div class="technics__catalog">

                <div class="technics__label label">
                  Рекомендуем прочитать:
                </div>

                ${formatList(item.recommendedReading)}

              </div>
            ` : ""}

            <!-- Хештеги -->

            <div class="technics__links">

              ${item.category ? `
                <a href="/technics.html?category=${item.tag}">
                  #${item.category}
                </a>
              ` : ""}

              ${formatHashtags(item.hashtags)}

            </div>

          </div>

        </div>

      </section>
    `;
  }

  // =========================
  // ERROR
  // =========================

  function renderError(message) {
    contentContainer.innerHTML = `
      <section class="technic-error">

        <div class="technics__container">

          <h1>
            ${message}
          </h1>

          <a href="/technics.html">
            ← Вернуться к техникам
          </a>

        </div>

      </section>
    `;
  }
});