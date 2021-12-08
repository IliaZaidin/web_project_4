/**================================================================*/
export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._text = data.card_title;
        this._link = data.card_link;
        this._newCard = templateSelector.querySelector('.picture-grid__item').cloneNode(true);
        this._cardTitle = this._newCard.querySelector('.picture-grid__title');
        this._cardPicture = this._newCard.querySelector('.picture-grid__img')
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {
        //Toggle like button
        this._newCard.querySelector('.picture-grid__like').addEventListener('click', event => {
            event.target.classList.toggle('picture-grid__like_active');
        })

        //  Delete card
        this._newCard.querySelector('.picture-grid__delete').addEventListener('click', event => {
            this._newCard.remove();
            this._newCard = null;
        })

        //Expand picture
        this._newCard.querySelector('.picture-grid__img').addEventListener('click', event => {
            this._handleCardClick(this._link, this._text);
        })
    }

    _presetNewCard() {
        this._cardTitle.textContent = this._text;
        this._cardPicture.src = this._link;
        this._cardPicture.alt = this._text;
    }

    //Create card
    createCard() {
        this._presetNewCard();
        this._setEventListeners();
        return this._newCard;
    }
}