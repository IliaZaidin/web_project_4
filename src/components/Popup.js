export default class Popup {
    constructor(popupSelector) {
        this._popupItem = document.querySelector(popupSelector);
        this._popupCloseButton = this._popupItem.querySelector('.popup__close');
        this._closeOnEscape = (event) => {
            if (event.key === "Escape") {
                this.close();
            }
        }
    }
    open() {
        //add close on escape event listener
        document.addEventListener('keyup', this._closeOnEscape);

        this._popupItem.classList.add('popup_is_opened');
    }

    close() {
        //remove close on escape event listener
        document.removeEventListener('keyup', this._closeOnEscape);

        this._popupItem.classList.remove('popup_is_opened');
    }

    setEventListeners() {
        //close on button click
        this._popupCloseButton.addEventListener('click', (event) => {
            this.close();
            event.stopImmediatePropagation();
        })

        //close on overlay click
        this._popupItem.addEventListener('mousedown', (event) => {
            if ([...event.target.classList].includes('popup'))
                this.close();
            event.stopImmediatePropagation();
        })
    }
}