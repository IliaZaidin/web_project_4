import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(submitForm, popupSelector) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._fieldsData = {};
        this._formElement = this._popupItem.querySelector('.form');
        this._inputsList = this._popupItem.querySelectorAll(".form__input");
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    _getInputValues() {
        this._inputsList.forEach(input => {
            this._fieldsData[input.name] = input.value;
        })
    }

    setEventListeners() {
        //submit form
        this._popupItem.addEventListener('submit', (event) => {
            this._getInputValues();
            this._submitForm(event, this._fieldsData);
            event.stopImmediatePropagation();
        })

        super.setEventListeners();
    }
}