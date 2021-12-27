export default class Popup {
    constructor(popupSelector) {
        this._popupItem = document.querySelector(popupSelector);
        this._popupCloseButton = this._popupItem.querySelector('.popup__close');

        this._closeOnEscape = (event) => {
            if (event.key === "Escape") {
                this.close();
            }
        }

        this._closeOnButtonClick = (event) => {
            this.close();
            event.stopImmediatePropagation();
        }

        this._closeOnOverlayClick = (event) => {
            if ([...event.target.classList].includes('popup'))
                this.close();
            event.stopImmediatePropagation();
        }
    }
    
    open() {
        //add escape event listeners
        document.addEventListener('keyup', this._closeOnEscape);
        this._popupCloseButton.addEventListener('click', this._closeOnButtonClick);
        this._popupItem.addEventListener('mousedown', this._closeOnOverlayClick);
        
        //open the popup
        this._popupItem.classList.add('popup_is_opened');
    }

    close() {
        //remove event listeners
        document.removeEventListener('keyup', this._closeOnEscape);
        this._popupCloseButton.removeEventListener('click', this._closeOnButtonClick);
        this._popupItem.removeEventListener('mousedown', this._closeOnOverlayClick);

        //close the popup
        this._popupItem.classList.remove('popup_is_opened');
    }
}