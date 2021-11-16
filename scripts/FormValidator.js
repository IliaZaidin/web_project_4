export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._formElement = formElement;
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
  }

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "");
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", "");
  }

  _toggleButtonState () {  
    const hasInvalidInput = this._inputElements.some(inputElement => !inputElement.validity.valid);

    if (hasInvalidInput) {
      this._disableSubmitButton(this._buttonElement);
    } else {
      this._enableSubmitButton(this._buttonElement);
    }
  }
  
  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }
  
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }
  
  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}_error`);

    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    }
  }
  
  _setEventListeners() {
    this._inputElements.forEach(inputElement => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputElements, this._buttonElement);
      })
    })
  }
  
  disableSubmitButton() {
    this._disableSubmitButton();
  }

  enableValidation() {
    this._setEventListeners();
    }
}