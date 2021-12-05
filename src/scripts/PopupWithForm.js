import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(submitForm, popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._submitForm = submitForm;
        this._fieldsArray = [];
        this._popupCloseButton = this._popupElement.querySelector('.popup__close');
        this._formElement = this._popupElement.querySelector('.form');
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    _getInputValues() {
        const inputsList = this._popupElement.querySelectorAll(".form__input");
        let i = 0;
        inputsList.forEach(element => {
            this._fieldsArray[i] = element.value;
            i++;
        });
    }

    setEventListeners() {
        //submit form
        this._popupElement.addEventListener('submit', (event) => {
            this._getInputValues();
            this._submitForm(event, this._fieldsArray[0], this._fieldsArray[1]);
            event.stopImmediatePropagation();
        })

        super.setEventListeners();
    }
}