/**================================================================*/
export default class Card {
    constructor(data, myId, templateSelector, handleCardClick, api, cardDeletePopup, confirmButton) {
        this._text = data.name;
        this._link = data.link;
        this._cardId = data._id;
        this._ownerName = data.owner.name;
        this._ownerId = data.owner._id;
        this._myId = myId;
        this._likesArray = data.likes;
        this._likesCount = data.likes.length;

        this._myLike = false;
        this._newCard = templateSelector.querySelector('.picture-grid__item').cloneNode(true);
        this._cardTitle = this._newCard.querySelector('.picture-grid__title');
        this._cardPicture = this._newCard.querySelector('.picture-grid__img');
        this._cardLikeButton = this._newCard.querySelector('.picture-grid__like');
        this._cardLikes = this._newCard.querySelector('.picture-grid__likes');
        this._cardDeleteButton = this._newCard.querySelector('.picture-grid__delete');
        this._confirmButton = confirmButton;

        this._api = api;
        this._handleCardClick = handleCardClick;
        this._cardDeletePopup = cardDeletePopup;
    }

    _setEventListeners() {
        //Toggle like button
        this._cardLikeButton.addEventListener('click', event => {
            if (!this._myLike) {
                event.target.classList.add('picture-grid__like_active');
                this._myLike = true;
                this._api.like(this._cardId)
                    .then(card => {
                        this._cardLikes.textContent = card.likes.length;
                    });
            } else {
                event.target.classList.remove('picture-grid__like_active');
                this._myLike = false;
                this._api.dislike(this._cardId)
                    .then(card => {
                        this._cardLikes.textContent = card.likes.length;
                    });
            }
        })

        //Open delete confirmation 
        this._cardDeleteButton.addEventListener('click', () => {
            this._cardDeletePopup.open();
            this._cardDeletePopup.setEventListeners();
            this._confirmButton.addEventListener('click', () => {
                this._api.deleteCard(this._cardId)
                    .then(() => {
                        this._newCard.remove();
                        this._newCard = null;
                        this._cardDeletePopup.close();
                        this._confirmButton.removeEventListener('click', this._deleteCard);
                    });
            });
        })

        //Expand picture
        this._newCard.querySelector('.picture-grid__img').addEventListener('click', event => {
            const likers = this._likesArray.map((element)=> {
                return " "+element.name;
            });
            const text = this._text+" by "+this._ownerName+". Liked by:"+likers;
            this._handleCardClick(this._link, text);
        })
    }

    _checkMyLikes() {
        this._likesArray.forEach(element => {
            if (element._id === this._myId) {
                this._cardLikeButton.classList.add('picture-grid__like_active');
                this._myLike = true;
            }
        });
    }

    _checkCardOwner() {
        if (this._ownerId === this._myId) {
            this._cardDeleteButton.classList.remove('picture-grid__delete_disabled');
        }
    }

    _presetNewCard() {
        this._cardTitle.textContent = this._text;
        this._cardPicture.src = this._link;
        this._cardPicture.alt = this._text;
        this._cardLikes.textContent = this._likesCount;
        this._checkMyLikes();
        this._checkCardOwner();
    }

    //Create card
    createCard() {
        this._presetNewCard();
        this._setEventListeners();
        return this._newCard;
    }
}