import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupItem = document.querySelector(popupSelector);
        this._popupTitle = this._popupItem.querySelector('.popup__title_type_picture');
        this._popupLink = this._popupItem.querySelector('.popup__picture-link');
    }

    //expand picture
    open(link, text) {
        this._popupLink.setAttribute('src', link);
        this._popupLink.setAttribute('alt', text);
        this._popupTitle.textContent = text;
        super.open();
    }
}