// АНАЛИЗ: Оптимизация HTML, SCSS и JavaScript для session-страниц
// Документ содержит рекомендации по улучшению кода

## ==========================================
## ПРОБЛЕМЫ И РЕКОМЕНДАЦИИ
## ==========================================

### ❌ ПРОБЛЕМЫ В HTML

#### 1. **Дублирование кода между страницами** (career-advice, coaching-session, serf-session)
   - Все три страницы имеют идентичную структуру `<body class="wrapper">`
   - Повторяются включения партиалов: header, footer, js, request-form, payment-form
   - **РЕШЕНИЕ**: Создать единый шаблон или использовать конфиги для генерации

#### 2. **Неконсистентные классы для модификаторов кнопок**
   ```html
   <!-- career-advice.html & coaching-session.html -->
   <a class="session__link_green">Оплатить</a>
   
   <!-- serf-session.html -->
   <a class="session__link_black">Оплатить</a>
   ```
   - Разные классы для одинакового стиля
   - **РЕШЕНИЕ**: Унифицировать на один модификатор

#### 3. **Неправильные data-атрибуты на modal**
   ```html
   <!-- В career-advice линия 105 -->
   <a href="#modal-request" data-modal-title="Запись на serf-сессию"> ❌ НЕПРАВИЛЬНО
   
   <!-- Должно быть -->
   <a href="#modal-request" data-modal-title="Запись на карьерную консультацию"> ✓
   ```

#### 4. **Различающиеся комментарии**
   ```html
   <!-- serf-session использует _anim-items -->
   <div class="session-list__item _anim-items _anim-no-hide">
   
   <!-- career-advice и coaching-session этого НЕ используют -->
   <div class="solution__item">
   ```
   - Нужна унификация подхода к классам анимации

---

### ❌ ПРОБЛЕМЫ В JAVASCRIPT

#### 1. **Дублированный код в 3 файлах** 📋
   
   **career-advice-page.js** (66 строк)
   **coaching-session-page.js** (81 строк - точная копия с комментариями)
   **serf-session-page.js** (36 строк - другой подход)

   **Проблемы:**
   - 90% кода идентичен между career-advice и coaching-session
   - serf-session использует другой механизм (классы `_anim-items`, `_active`)
   - Нарушение DRY-принципа
   - Сложно поддерживать и обновлять

   **РЕШЕНИЕ**: Создать общую библиотеку анимаций

#### 2. **Различающиеся селекторы и классы**
   ```javascript
   // career-advice и coaching-session используют:
   ".solution__item"
   ".servise-session__img"
   "visible" / "show" классы
   
   // serf-session использует:
   "._anim-items"
   "_active" класс
   ```
   - **Причина**: serf-session имеет дополнительные элементы (session-list, session-download)
   - **РЕШЕНИЕ**: Создать модульный подход

#### 3. **Жёсткие таймауты вместо расчётов**
   ```javascript
   // Строка 49 (career-advice)
   setTimeout(() => decorImg.classList.add("show"), 300 * imgElements.length + 200);
   ```
   - Магические числа, зависящие от CSS
   - Сложно масштабировать
   - **РЕШЕНИЕ**: Параметризировать

#### 4. **Неполная поддержка accessibility**
   ```javascript
   // prefersReducedMotion отключает анимацию, но:
   // - Нет проверки на мобильных устройствах с медленным интернетом
   // - Нет дебаунса IntersectionObserver
   // - Нет cleanup при переходе между страницами
   ```

---

### ❌ ПРОБЛЕМЫ В SCSS

#### 1. **Дублирование между модификаторами**
   ```scss
   // serf-session.scss - весь блок .serf-session дублирует .servise-session
   .servise-session { ... }  // 100 строк
   .serf-session { ... }      // 100 строк (идентичные!)
   ```
   - Полная копия кода
   - Затруднена поддержка
   - **РЕШЕНИЕ**: Использовать единый блок с миксинами

#### 2. **Жёсткие значения вместо переменных** (уже частично исправлено в refactor)
   ```scss
   // ДО:
   transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
   gap: 75px;
   
   // ПОСЛЕ (ваша рефакторизация):
   transition: opacity $transition-base 0.5s, transform $transition-base 0.5s;
   gap: $spacing-gap-large;
   ```

#### 3. **Разные цвета кнопок между страницами**
   ```scss
   // career-advice НЕ имеет отдельного файла (используется session-base)
   // coaching-session НЕ имеет отдельного файла
   // serf-session имеет собственный файл с $color-serf-primary
   
   // НУЖНА КОНСИСТЕНТНОСТЬ!
   ```

#### 4. **Сложность селекторов**
   ```scss
   .session-download__item:hover &__img_01 { ... }
   ```
   - Вложенные селекторы могут быть неправильными
   - Специфичность может быть проблемой на больших проектах

---

## ==========================================
## РЕКОМЕНДУЕМАЯ СТРУКТУРА (РЕФАКТОРИНГ)
## ==========================================

### 📁 Новая структура файлов:

```
src/
├── pages/
│   ├── session-animations.js          ✨ NEW - общая библиотека
│   ├── career-advice-page.js           (упрощено - только инициализация)
│   ├── coaching-session-page.js        (упрощено - только инициализация)
│   └── serf-session-page.js            (упрощено - только инициализация)
│
└── scss/
    └── pages/
        ├── _session-base.scss          ✓ (уже оптимизировано)
        ├── _session-mixins.scss        ✨ NEW - миксины
        ├── career-advice.scss          ✨ NEW (минимальный)
        ├── coaching-session.scss       ✨ NEW (минимальный)
        └── serf-session.scss           (улучшено)
```

---

## ==========================================
## КОНКРЕТНЫЕ РЕКОМЕНДАЦИИ
## ==========================================

### 1️⃣ ОБЪЕДИНИТЬ JavaScript анимации

**Создать: src/pages/session-animations.js**

```javascript
/**
 * Общая библиотека для анимаций session-страниц
 */

const SessionAnimations = {
  // Конфиг для разных типов сессий
  configs: {
    default: {
      solutionSelector: ".solution__item",
      serviceSelector: ".servise-session",
      imgSelector: ".servise-session__img",
      blockSelector: ".servise-session__block",
      decorSelector: ".servise-session__decor-img",
      visibleClass: "visible",
      showClass: "show",
      solutionDelay: 200,
      solutionInitialDelay: 500,
    },
    serf: {
      animSelector: "._anim-items",
      activeClass: "_active",
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  },

  init(type = "default") {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      this.disableAnimations(type);
      return;
    }

    if (type === "serf") {
      this.initSerfAnimations();
    } else {
      this.initDefaultAnimations();
    }
  },

  initDefaultAnimations() {
    // Реализация
  },

  initSerfAnimations() {
    // Реализация
  },

  disableAnimations(type) {
    // Реализация
  },
};

// Экспорт для использования
export default SessionAnimations;
```

### 2️⃣ УНИФИЦИРОВАТЬ HTML структуру

**Проблема:** Три файла 95% идентичны

**Решение:** Использовать общий шаблон с переменными

```html
<!-- src/partials/session-template.html -->
<!-- Параметры: title, subtitle, solutions, sessionType, jsFile -->

<!DOCTYPE html>
<html lang="ru">
@@include('head.html', {"title": @@title, "description": @@description})
<body class="body @@pageClass">
  <div class="wrapper">
    @@include('header.html', {})
    <main class="page">
      <section class="session">
        <!-- Контент на основе параметров -->
      </section>
    </main>
    @@include('footer.html', {})
    <script type="module" src="@@jsFile"></script>
  </div>
</body>
</html>
```

### 3️⃣ СОЗДАТЬ МИКСИНЫ ДЛЯ SCSS

**Создать: src/scss/pages/_session-mixins.scss**

```scss
// Миксин для кнопок сессий
@mixin session-button-style($primary, $light, $text) {
  background: $light;
  color: $text;
  transition: all $transition-fast;

  &:hover {
    background: $text;
    color: $light;
  }
}

// Миксин для блоков с анимацией
@mixin animated-block($direction: "left") {
  opacity: 0;
  transform: translate#{if($direction == "left", "X", "Y")}(if($direction == "left", -200px, -270px));
  transition: opacity $transition-base 0.5s, transform $transition-base 0.5s;

  &.show,
  &._active {
    opacity: 1;
    transform: translate#{if($direction == "left", "X", "Y")}(0);
  }
}
```

### 4️⃣ УНИФИЦИРОВАТЬ КЛАССЫ

**Изменения в HTML:**

```html
<!-- Вместо различных модификаторов кнопок -->
<!-- ДО: session__link_green vs session__link_black -->

<!-- ПОСЛЕ: единый класс -->
<a class="session__link session__link--primary">Оплатить</a>

<!-- Единые классы анимации -->
<div class="solution__item js-animate-item">...</div>
<div class="session-list__item js-animate-item">...</div>
```

### 5️⃣ УЛУЧШИТЬ PERFORMANCE

- Добавить дебаунс для IntersectionObserver
- Отключать наблюдатели при переходе
- Кэшировать селекторы DOM
- Использовать requestAnimationFrame для плавных анимаций

---

## ==========================================
## ПРИОРИТЕТ РЕФАКТОРИНГА
## ==========================================

| Приоритет | Действие | Сложность | Выигрыш |
|-----------|---------|----------|--------|
| 🔴 ВЫСОКИЙ | Объединить JS код | ⭐⭐ | Легче поддерживать, -50 строк |
| 🔴 ВЫСОКИЙ | Унифицировать HTML классы | ⭐ | Согласованность, -30 строк |
| 🟡 СРЕДНИЙ | Создать общий HTML шаблон | ⭐⭐⭐ | DRY принцип, -200+ строк |
| 🟡 СРЕДНИЙ | Создать SCSS миксины | ⭐⭐ | Лучше организация, легче изменения |
| 🟢 НИЗКИЙ | Улучшить performance | ⭐⭐⭐ | Быстрее загрузка, лучше UX |

---

## ==========================================
## ЛИШНИЕ КЛАССЫ И СЕЛЕКТОРЫ
## ==========================================

### ❌ ЛИШНЕЕ:
- `solution__item_01` до `solution__item_06` - не используются в CSS
- `session-list__item_01`, `session-list__item_02` - не используются
- `serf-session__item_01`, `serf-session__item_02` - не используются
- `_anim-no-hide` - класс есть но не применяется

### ✓ РЕКОМЕНДАЦИЯ:
```html
<!-- ВМЕСТО -->
<div class="solution__item solution__item_01">

<!-- ИСПОЛЬЗУЙТЕ -->
<div class="solution__item" data-index="1">
<!-- или просто полагайтесь на :nth-child() в CSS -->
```

---

## ==========================================
## АНИМАЦИЯ - ДЕТАЛЬНЫЙ АНАЛИЗ
## ==========================================

### Career-Advice & Coaching-Session:
1. **Solution items** - каскадная анимация (200ms интервал, 500ms задержка)
2. **Service блок** - запускается после завершения solution
3. **Service images** - анимируются (300ms интервал)
4. **Service blocks** - анимируются после images (300ms интервал, 300ms задержка)
5. **Decor image** - последняя анимация (300 * count + 200ms)

**Проблемы:**
- Сложная цепочка промис (hard to debug)
- Жёсткие таймауты
- Сложно добавить новый элемент

### Serf-Session:
1. **_anim-items** - простая анимация на видимость (200ms threshold)
2. Срабатывает независимо для каждого элемента

**Преимущества:**
- Простая логика
- Легко добавлять элементы
- Лучше performance

**Рекомендация:** Переделать career-advice и coaching-session на модель serf-session, но с сохранением каскадности

---

## ИТОГОВЫЙ ЧЕКlista ДЛЯ РЕФАКТОРИНГА:

- [ ] Объединить JS код в session-animations.js
- [ ] Унифицировать HTML классы (_anim-items везде)
- [ ] Убрать неиспользуемые классы типа _anim-no-hide
- [ ] Убрать нумерованные модификаторы (solution__item_01 и т.д.)
- [ ] Унифицировать модификаторы кнопок (session__link--primary)
- [ ] Создать session-mixins.scss
- [ ] Упростить serf-session.scss (удалить дублирование)
- [ ] Добавить performance оптимизации
- [ ] Протестировать на мобильных устройствах
- [ ] Проверить accessibility (a11y) для анимаций
