import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, confirmButton, confirmCardDeletion) {
        super(popupSelector);
        this._confirmButton = confirmButton;
        this._confirmCardDeletion = confirmCardDeletion;
        this._confirmDelete = 0;
    }

    close() {
        super.close();
        this._confirmButton.removeEventListener('click', this._confirmDelete);
    }

    setEventListeners(card, cardId) {
        super.open();
        this._confirmDelete = ()=> {
            this._confirmCardDeletion(card, cardId);
        }
        this._confirmButton.addEventListener('click', this._confirmDelete);
    }
}