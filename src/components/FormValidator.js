export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;                 //".form"
    this._inputSelector = settings.inputSelector;               //".form__input"
    this._submitButtonSelector = settings.submitButtonSelector; //".form__submit"
    this._inactiveButtonClass = settings.inactiveButtonClass;   //"form__submit_disabled"
    this._inputErrorClass = settings.inputErrorClass;           //"form__input_type_error"
    this._errorClass = settings.errorClass;                     //"form__error_visible"

    this._formElement = formElement;
    this._inputFields = Array.from(this._formElement.querySelectorAll(this._inputSelector));
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
    const hasInvalidInput = this._inputFields.some(inputField => !inputField.validity.valid);

    if (hasInvalidInput) {
      this._disableSubmitButton(this._buttonElement);
    } else {
      this._enableSubmitButton(this._buttonElement);
    }
  }
  
  _showInputError(inputField, errorElement) {
    inputField.classList.add(this._inputErrorClass);
    errorElement.textContent = inputField.validationMessage;
    errorElement.classList.add(this._errorClass);
  }
  
  _hideInputError(inputField, errorElement) {
    inputField.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }
  
  _checkInputValidity(inputField) {
    const errorElement = this._formElement.querySelector(`#${inputField.id}_error`);

    if (inputField.validity.valid) {
      this._hideInputError(inputField, errorElement);
    } else {
      this._showInputError(inputField, errorElement);
    }
  }
  
  _setEventListeners() {
    this._inputFields.forEach(inputField => {
      inputField.addEventListener("input", () => {
        this._checkInputValidity(inputField);
        this._toggleButtonState();
      })
    })
  }
  
  resetValidation() {
    this._disableSubmitButton();
    this._inputFields.forEach(inputField => {
      const errorElement = this._formElement.querySelector(`#${inputField.id}_error`);
      this._hideInputError(inputField, errorElement);
    })
  }

  enableValidation() {
    this._setEventListeners();
    }
}