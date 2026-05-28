export function btnValidation() {
  const btn = document.querySelector(".modal-request__btn");
  const inputName = document.querySelector(".modal-request__name");
  const inputPhone = document.querySelector(".modal-request__phone");
  const inputEmail = document.querySelector(".modal-request__email");

  if (!btn) return;

  inputName.addEventListener("input", checkLength);
  inputPhone.addEventListener("input", checkLength);
  inputEmail.addEventListener("input", checkLength);

  function checkLength() {
    if (
      inputName.value.length > 1 &&
      inputPhone.value.length > 1 &&
      inputEmail.value.length > 1 &&
      isValidEmail(inputEmail.value)
    ) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}