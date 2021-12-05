export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this._popupSelector.classList.add('popup_is_opened');
    }

    close() {
        this._popupSelector.classList.remove('popup_is_opened');
    }

    _handleEscClose(event) {
        if (event.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        //close on button click
        const popupCloseButton = this._popupSelector.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', (event) => {
            this.close();
            event.stopImmediatePropagation();
        })

        //close on overlay click
        this._popupSelector.addEventListener('mousedown', (event) => {
            if ([...event.target.classList].includes('popup'))
                this.close();
            event.stopImmediatePropagation();
        })

        //close on escape
        document.addEventListener('keyup', (event) => {
            this._handleEscClose(event);
        })
    }
}