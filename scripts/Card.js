/**=======================imports ================================ */
import {openPopup} from "./utils.js";

/**================================================================*/
export default class Card {
    constructor(data, templateSelector) {
        this._text = data.name;
        this._link = data.link;
        this._newCard = templateSelector.querySelector('.picture-grid__item').cloneNode(true);
        this._picturePopup = document.querySelector('.popup_type_picture');
    }

    _setEventListeners() {
        this._newCard.querySelector('.picture-grid__like').addEventListener('click', event=>{ //Toggle like button
            event.target.classList.toggle('picture-grid__like_active');
        })

        this._newCard.querySelector('.picture-grid__delete').addEventListener('click', event=>{ //Delete card
            this._newCard.remove();
            this._newCard = null;
        })

        this._newCard.querySelector('.picture-grid__img').addEventListener('click', event=>{ //Expand picture
            document.querySelector('.popup__picture').setAttribute('src', this._link);
            document.querySelector('.popup__picture').setAttribute('alt', this._text);
            document.querySelector('.popup__title_type_picture').textContent = this._text;
            openPopup(this._picturePopup);
        })
    }

    _presetNewCard () {
        this._newCard.querySelector('.picture-grid__title').textContent = this._text;
        this._newCard.querySelector('.picture-grid__img').src = this._link;
        this._newCard.querySelector('.picture-grid__img').alt = this._text;
    }

    createCard() {  //Create card
        this._presetNewCard();
        this._setEventListeners();
        return this._newCard;
    }
}