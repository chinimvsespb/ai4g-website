
// Инициализация анимаций при скролле
export function initAnimations({
  animSelector = "._anim-items",
  observerOptions = { root: null, rootMargin: "0px", threshold: 0.3 },
  animDuration = 1.5,
} = {}) {
  const animItems = document.querySelectorAll(animSelector);
  if (animItems.length > 0) {
    animItems.forEach((item) => item.classList.add("_hidden"));
    const animCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = `opacity ${animDuration}s ease, transform ${animDuration}s ease`;
          entry.target.classList.remove("_hidden");
          entry.target.classList.add("_active");
          if (!entry.target.classList.contains("_anim-no-hide")) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!entry.target.classList.contains("_anim-no-hide")) {
            entry.target.classList.remove("_active");
          }
        }
      });
    };
    const observer = new IntersectionObserver(animCallback, observerOptions);
    animItems.forEach((animItem) => observer.observe(animItem));
  }
}
