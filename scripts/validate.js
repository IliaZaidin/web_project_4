/**=======================variables ============================== */
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

/**==================== functions =========================================== */
function resetFormValidity (formElement) {
  console.log("blah");
}

function toggleButtonState (inputElements, buttonElement, settings) {  
  const hasInvalidInput = inputElements.some(inputElement => !inputElement.validity.valid);
  if (hasInvalidInput) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "");
  }
};

function showInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

function checkInputValidity(formElement, inputElement, settings) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, settings);
  } else {
    showInputError(formElement, inputElement, settings);
  }
};

function setEventListeners(formElement, settings) {
  const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  inputElements.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputElements, buttonElement, settings);
    });
  });
};

function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach(formElement => {
    setEventListeners(formElement, settings);
  });
};

function checkInitialFormValidity(formElement, settings) {  
  const inputElements = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  inputElements.forEach(inputElement => {
      checkInputValidity(formElement, inputElement, settings);
  });
  toggleButtonState(inputElements, buttonElement, settings);
};

enableValidation(settings);