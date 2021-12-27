import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, confirmButton) {
        super(popupSelector);
        this._confirmButton = confirmButton;
        this._confirmCardDeletion = 0;
    }

    close() {
        super.close();
        this._confirmButton.removeEventListener('click', this._confirmCardDeletion);
    }

    setEventListeners(confirmCardDeletion) {
        this._confirmButton.addEventListener('click', confirmCardDeletion);
        this._confirmCardDeletion = confirmCardDeletion;
    }
}
