import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupPicture = document.querySelector('.popup__picture');
        this._popupTitle = document.querySelector('.popup__title_type_picture');
    }

    //expand picture
    open(link, text) {
        this._popupPicture.setAttribute('src', link);
        this._popupPicture.setAttribute('alt', text);
        this._popupTitle.textContent = text;
        super.open();
    }
}