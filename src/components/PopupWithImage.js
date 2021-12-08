import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupTitle = document.querySelector('.popup__title_type_picture');
    }

    //expand picture
    open(link, text) {
        this._popupItem.setAttribute('src', link);
        this._popupItem.setAttribute('alt', text);
        this._popupTitle.textContent = text;
        super.open();
    }
}