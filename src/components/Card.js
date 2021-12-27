/**================================================================*/
export default class Card {
    constructor(data, myId, templateSelector, handleCardClick, api, cardDeletePopup) {
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

        this._api = api;
        this._cardDeletePopup = cardDeletePopup;
        this._handleCardClick = handleCardClick;

        this._confirmCardDeletion = () => {
            this._api.deleteCard(this._cardId)
                .then(() => {
                    this._newCard.remove();
                    this._newCard = null;
                })
                .catch((err) => {
                    console.log("Error: ", err.status, err.statusText);
                })
                .finally(() => {
                    this._cardDeletePopup.close();
                });
        }
    }

    _setEventListeners() {
        //Toggle like button
        this._cardLikeButton.addEventListener('click', event => {
            if (!this._myLike) {
                this._api.like(this._cardId)
                    .then(card => {
                        this._cardLikes.textContent = card.likes.length;
                        event.target.classList.add('picture-grid__like_active');
                        this._myLike = true;
                    })
                    .catch((err) => {
                        console.log("Error: ", err.status, err.statusText);
                    });
            } else {
                this._api.dislike(this._cardId)
                    .then(card => {
                        this._cardLikes.textContent = card.likes.length;
                        event.target.classList.remove('picture-grid__like_active');
                        this._myLike = false;
                    })
                    .catch((err) => {
                        console.log("Error: ", err.status, err.statusText);
                    });
            }
        })

        //Open delete confirmation 
        this._cardDeleteButton.addEventListener('click', () => {
            this._cardDeletePopup.open();
            this._cardDeletePopup.setEventListeners(this._confirmCardDeletion);
        })

        //Expand picture
        this._newCard.querySelector('.picture-grid__img').addEventListener('click', event => {
            const text = this._text + " (uploaded by " + this._ownerName + ")";
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