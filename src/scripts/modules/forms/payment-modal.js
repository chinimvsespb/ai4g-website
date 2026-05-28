let lastPaymentTrigger = null;

function trackPaymentClicks() {
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[data-fancybox][href="#payment"], a[data-fancybox][href="#payment-modal"]');
    if (link) {
      lastPaymentTrigger = link;
      setTimeout(updatePaymentModal, 10);
    }
  }, true);
}

function setPaymentAmount(currentSlide, amount) {
  const amountEl = currentSlide.querySelector('#payment-amount');
  if (amountEl) amountEl.textContent = Number(amount).toLocaleString('ru-RU');
}

function updatePaymentModal() {
  const trigger = lastPaymentTrigger;
  if (!trigger) return;

  // Найдём открытый слайд Fancybox
  const slides = document.querySelectorAll('.fancybox-slide--current');
  slides.forEach(currentSlide => {
    // Заголовок окна
    const newTitle = trigger.getAttribute('data-modal-title') || trigger.textContent.trim() || "Оплата";
    const titleEl = currentSlide.querySelector('#payment-title');
    if (titleEl) titleEl.textContent = newTitle;

    // Поля sum, service_name, orderid
    const sumInput = currentSlide.querySelector('#sum');
    const serviceInput = currentSlide.querySelector('#service_name');
    const orderidInput = currentSlide.querySelector('#orderid');

    // Блок для суммы оплаты
    const amountBlock = currentSlide.querySelector('#payment-summary');
    const amountSpan = currentSlide.querySelector('#payment-amount');

    // === Обработка выбора тарифов ===
    const priceChoicesDiv = currentSlide.querySelector('#price-choices');
    if (priceChoicesDiv) {
      const priceChoices = trigger.dataset.priceChoices;
      if (priceChoices) {
        const choiceTitle = trigger.dataset.choiceTitle || 'Выберите оплата за:';
        const options = priceChoices.split(',').map((pair, index) => {
          const colon = pair.indexOf(':');
          if (colon === -1) return null; // защитимся от ошибок
          const price = pair.slice(0, colon).trim();
          const label = pair.slice(colon + 1).trim();
          return { price, label, checked: index === 0 };
        }).filter(Boolean);

        priceChoicesDiv.innerHTML = `
          <div class="payment__choice payment__choice_price">
            <div class="payment__left">${choiceTitle}</div>
            <div class="payment__right">
              ${options.map(opt => `
                <label class="payment__label">
                  <input class="payment__radio" type="radio" name="payment_option" value="${opt.price}" ${opt.checked ? 'checked' : ''} required />
                  <span>${opt.label}</span>
                </label>
              `).join('')}
            </div>
          </div>
        `;
        priceChoicesDiv.style.display = '';
        // Привязка radio
        const radios = priceChoicesDiv.querySelectorAll('.payment__radio');
        radios.forEach(radio => {
          radio.addEventListener('change', () => {
            if (sumInput) sumInput.value = radio.value;
            setPaymentAmount(currentSlide, radio.value);
          });
        });

        // Выставить дефолт: первая опция
        if (sumInput) sumInput.value = options[0].price;
        setPaymentAmount(currentSlide, options[0].price);

      } else {
        priceChoicesDiv.style.display = 'none';
        // Если тарифов нет — использовать сумму по умолчанию
        if (sumInput) {
          sumInput.value = trigger.dataset.sum || '';
          setPaymentAmount(currentSlide, sumInput.value);
        }
      }
    }

    // service_name и orderid — всегда подставляем
    if (serviceInput) serviceInput.value = trigger.dataset.service || '';
    if (orderidInput) orderidInput.value = trigger.dataset.orderid || '';
  });
}

function bindPaymentFancybox() {
  if (!window.$ || !$.fancybox) {
    setTimeout(bindPaymentFancybox, 50);
    return;
  }
  if (!window._paymentFancyboxBound) {
    $(document).on('afterLoad.fb', function() {
      setTimeout(updatePaymentModal, 0);
    });
    window._paymentFancyboxBound = true;
  }
}

function initPaymentFormSubmit() {
  document.addEventListener('submit', function(e) {
    const form = e.target.closest('#payment-form');
    if (!form) return;
    // e.preventDefault();  // только для теста!
    // Покажите спасибо или редирект как нужно
  });
}

export function initPaymentModal() {
  trackPaymentClicks();
  bindPaymentFancybox();
  initPaymentFormSubmit();
}