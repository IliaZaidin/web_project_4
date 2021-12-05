/**=======================imports ================================ */
import "../pages/index.css"; 
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithForm from "./PopupWithForm.js";

/**====================== selectors ========================= */
// const profileTitle = document.querySelector('.profile__title');
// const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__edit-button');
// const profileButtonSubmit = document.querySelector('.form__submit_type_profile');
const profilePopup = document.querySelector('.popup_type_profile');
// const profilePopupForm = profilePopup.querySelector('.popup__wrapper_type_profile');
const profilePopupName = profilePopup.querySelector('.form__input_type_name');
const profilePopupAbout = profilePopup.querySelector('.form__input_type_about');
// const profilePopupButtonClose = profilePopup.querySelector('.popup__close_type_profile');
const profileForm = document.querySelector('.form_type_profile');

// const cardWrapper = document.querySelector('.picture-grid');
const cardButtonAdd = document.querySelector('.profile__add-button');
// const cardButtonSubmit = document.querySelector('.form__submit_type_card');
const cardPopup = document.querySelector('.popup_type_card');
// const cardPopupTitle = cardPopup.querySelector('.form__input_type_title');
// const cardPopupLink = cardPopup.querySelector('.form__input_type_link');
// const cardPopupButtonClose = cardPopup.querySelector('.popup__close_type_card');
const cardTemplate = document.querySelector('.card-template').content;
const cardForm = cardPopup.querySelector('.form_type_card');

// const picturePopup = document.querySelector('.popup_type_picture');
// const picturePopupClose = document.querySelector('.popup__close_type_picture');

/**=======================variables ============================== */
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

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

const profileFormValidator = new FormValidator(settings, profileForm);
const cardFormValidator = new FormValidator(settings, cardForm);
const userData = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' });

const profilePopupHandler = new Popup('.popup_type_profile');
const cardPopupHandler = new Popup('.popup_type_card');

const profileFormHandler = new PopupWithForm(handleFormSubmission, '.popup_type_profile');
const cardFormHandler = new PopupWithForm(handleFormSubmission, '.popup_type_card');

/**======================= functions ====================================== */
function handleCardClick(link, text) {
  const picturePopupHandler = new PopupWithImage('.popup_type_picture', link, text);
  picturePopupHandler.open();
  picturePopupHandler.setEventListeners();
}

function makeCardInstance(cardData) {
  const card = new Card(cardData, cardTemplate, handleCardClick);
  return card.createCard();
}

function handleFormSubmission(event, fieldOne, fieldTwo) {
  //update profile
  if ([...event.target.classList].includes('form_type_profile')) {
    event.preventDefault();
    userData.setUserInfo(fieldOne, fieldTwo);
    profileFormHandler.close();
  }

  //create new card
  else if ([...event.target.classList].includes('form_type_card')) {
    const cardData = [{
      name: fieldOne,
      link: fieldTwo
    }];
    event.preventDefault();
    const itemRenderer = new Section({ items: cardData, renderer: makeCardInstance }, ".picture-grid");
    itemRenderer.renderAll();
    cardFormHandler.close();
  }
}

/*==================== profile event listeners ===============================*/
//Open profile edit form
profileButtonEdit.addEventListener('click', () => {
  profilePopupName.value = userData.getUserInfo().name;
  profilePopupAbout.value = userData.getUserInfo().job;
  profileFormValidator.resetValidation();
  profilePopupHandler.open();
  profileFormHandler.setEventListeners();
})

/*=================== new card popup event listeners ====================================================*/
//Open new card form
cardButtonAdd.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardPopupHandler.open();
  cardFormHandler.setEventListeners();
})

/**============================== initial runs =======================================================*/
window.onload = () => {
  //create first 6 cards
  const itemsRenderer = new Section({ items: initialCards, renderer: makeCardInstance }, ".picture-grid");
  itemsRenderer.renderAll();

  //enable forms validation
  cardFormValidator.enableValidation();
  profileFormValidator.enableValidation();
}