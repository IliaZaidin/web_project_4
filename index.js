//===================== profile ===============================
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupForm = profilePopup.querySelector('.popup__form_type_profile');
const profilePopupName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupAbout = profilePopup.querySelector('.popup__input_type_about');
const profilePopupButtonClose = profilePopup.querySelector('.popup__close_type_profile');

profileButtonEdit.addEventListener('click', () => { //Open profile edit form
  profilePopupName.value = profileTitle.textContent;
  profilePopupAbout.value = profileSubtitle.textContent;
  profilePopup.classList.add('popup_is_opened');
});

profilePopupButtonClose.addEventListener('click', () => { //Close profile form
  profilePopup.classList.remove('popup_is_opened');
});

profilePopupForm.addEventListener('submit', (event) => { //Save edit form and close
  event.preventDefault();
  profileTitle.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupAbout.value;
  profilePopup.classList.remove('popup_is_opened');
});

//=================== cardPopup ====================================================
const cardButtonAdd = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupForm = cardPopup.querySelector('.popup__form_type_card');
const cardPopupTitle = cardPopup.querySelector('.popup__input_type_title');
const cardPopupLink = cardPopup.querySelector('.popup__input_type_link');
const cardPopupButtonClose = cardPopup.querySelector('.popup__close_type_card');

cardButtonAdd.addEventListener('click', () => { //Open new place card form
  cardPopup.classList.remove('popup_closed');
  cardPopup.classList.add('popup_is_opened');
});

cardPopupButtonClose.addEventListener('click', () => { //Close new place card form 
  cardPopup.classList.remove('popup_is_opened');
  cardPopup.classList.add('popup_closed');
});

cardPopupForm.addEventListener('submit', (event) => {  //Create new place card
  event.preventDefault();
  createCard();
});

//================================ cards ============================================
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];
const picturePopup = document.querySelector('.picture-large');
const picturePopupTitle = document.querySelector('.picture-large__title');
const picturePopupLink = document.querySelector('.picture-large__image');
const picturePopupClose = document.querySelector('.picture-large__close');

const cardTemplate = document.querySelector('.card-template').content;
const cardWrapper = document.querySelector('.picture-grid');

function createCard() { //Create card
  const cardCreator = cardTemplate.querySelector('.picture-grid__item').cloneNode(true);
  cardCreator.querySelector('.picture-grid__title').textContent = cardPopupTitle.value;
  cardCreator.querySelector('.picture-grid__img').src = cardPopupLink.value;
  cardWrapper.prepend(cardCreator);
  cardPopup.classList.remove('popup_is_opened');
  cardPopupTitle.value = "";
  cardPopupLink.value = "";
};

function runOnLoad() { //Run on load to create first 6 cards
  for (let i = 0; i < 6; i++) {
    cardPopupTitle.value = initialCards[i].name;
    cardPopupLink.value = initialCards[i].link;
    createCard();
  };
};

cardWrapper.addEventListener('click', (event) => {
  let eventTrigger = event.target.classList.value;

  switch (eventTrigger) {  
    case 'picture-grid__like': //Toggle like button on
      event.target.classList.toggle('picture-grid__like_active');
      break;

    case 'picture-grid__like picture-grid__like_active': //Toggle like button off
      event.target.classList.toggle('picture-grid__like_active');
      break;
      
    case 'picture-grid__delete': //Delete card
      const card = event.target.closest('.picture-grid__item');
      card.remove();
      break;

    case 'picture-grid__img': //Expand picture
      picturePopupLink.setAttribute('src', event.target.src);
      picturePopupTitle.textContent = event.target.nextElementSibling.textContent;
      picturePopup.classList.add('picture-large_is_opened');
      break;
  }
});

picturePopupClose.addEventListener('click', (event) => {  //Close expanded picture
  picturePopup.classList.remove('picture-large_is_opened');
});