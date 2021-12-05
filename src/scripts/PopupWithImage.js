import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector, link, text) {
        super(popupSelector);
        this._link = link;
        this._text = text;
    }

    //expand picture
    open() {
        document.querySelector('.popup__picture').setAttribute('src', this._link);
        document.querySelector('.popup__picture').setAttribute('alt', this._text);
        document.querySelector('.popup__title_type_picture').textContent = this._text;
        super.open();
    }
}