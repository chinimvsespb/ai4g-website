// src/pages/career-advice-page.js

document.addEventListener("DOMContentLoaded", function () {
  // Учёт системных настроек анимации
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateElements(elements, delayPerElement = 200, initialDelay = 0, className = "visible") {
    if (!elements.length) return Promise.resolve();
    return new Promise((resolve) => {
      elements.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add(className);
          if (idx === elements.length - 1) resolve();
        }, initialDelay + idx * delayPerElement);
      });
    });
  }

  if (prefersReducedMotion) {
    document.querySelectorAll(".solution__item, .servise-session__img, .servise-session__block, .servise-session__decor-img")
      .forEach(el => el.classList.add("visible", "show"));
    return;
  }

  // === АНИМАЦИЯ РЕШЕНИЙ ===
  const solutionItems = [...document.querySelectorAll(".solution__item")];
  const solutionContainer = document.querySelector(".session__solution");

  if (solutionContainer && solutionItems.length) {
    const solutionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElements(solutionItems, 200, 500, "visible")
            .then(() => {
              const serviceContainer = document.querySelector(".session__servise");
              if (!serviceContainer) return;

              const serviceObserver = new IntersectionObserver((serviceEntries) => {
                serviceEntries.forEach(serviceEntry => {
                  if (serviceEntry.isIntersecting) {
                    const imgElements = [...document.querySelectorAll(".servise-session__img")];
                    const blockElements = [...document.querySelectorAll(".servise-session__block")];
                    const decorImg = document.querySelector(".servise-session__decor-img");

                    animateElements(imgElements, 300, 0, "show")
                      .then(() => animateElements(blockElements, 300, 300, "show"))
                      .then(() => {
                        if (decorImg) {
                          setTimeout(() => decorImg.classList.add("show"), 300 * imgElements.length + 200);
                        }
                      });
                    serviceObserver.disconnect();
                  }
                });
              }, { threshold: 0.1 });

              serviceObserver.observe(serviceContainer);
            });
          solutionObserver.disconnect();
        }
      });
    }, { threshold: 0.1 });

    solutionObserver.observe(solutionContainer);
  }
});