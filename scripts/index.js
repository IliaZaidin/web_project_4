/**=======================imports ================================ */
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {openPopup, closePopup} from "./utils.js";

/**====================== selectors ========================= */
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profileButtonSubmit = document.querySelector('.form__submit_type_profile');
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupForm = profilePopup.querySelector('.popup__wrapper_type_profile');
const profilePopupName = profilePopup.querySelector('.form__input_type_name');
const profilePopupAbout = profilePopup.querySelector('.form__input_type_about');
const profilePopupButtonClose = profilePopup.querySelector('.popup__close_type_profile');
const profileForm = document.querySelector('.form_type_profile');

const cardWrapper = document.querySelector('.picture-grid');
const cardButtonAdd = document.querySelector('.profile__add-button');
const cardButtonSubmit = document.querySelector('.form__submit_type_card');
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupTitle = cardPopup.querySelector('.form__input_type_title');
const cardPopupLink = cardPopup.querySelector('.form__input_type_link');
const cardPopupButtonClose = cardPopup.querySelector('.popup__close_type_card');
const cardTemplate = document.querySelector('.card-template').content;
const cardForm = cardPopup.querySelector('.form_type_card');

const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupClose = document.querySelector('.popup__close_type_picture');

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

const profileFormValidator = new FormValidator (settings, profileForm);
const cardFormValidator = new FormValidator (settings, cardForm);

/**======================= functions ====================================== */
function renderCard(element) { //render new card
  cardWrapper.prepend(element);
  closePopup(cardPopup);
}

function makeCardInstance(data) {
  const card = new Card(data, cardTemplate);
  return card.createCard();
}

/**=================== popup close listeners ========================= */
cardPopup.addEventListener('mousedown', (event) => { //close card popup on overlay click
  if ([...event.target.classList].includes('popup_type_card'))
    closePopup(cardPopup);
})

profilePopup.addEventListener('mousedown', (event) => { //close profile popup on overlay click
  if ([...event.target.classList].includes('popup_type_profile'))
    closePopup(profilePopup);
})

picturePopup.addEventListener('mousedown', (event) => { //close picture popup on overlay click
  if ([...event.target.classList].includes('popup_type_picture'))
    closePopup(picturePopup);
})

picturePopupClose.addEventListener('click', (event) => {  //Close expanded picture
  closePopup(picturePopup);
})

/*==================== profile event listeners ===============================*/
profileButtonEdit.addEventListener('click', () => { //Open profile edit form
  profilePopupName.value = profileTitle.textContent;
  profilePopupAbout.value = profileSubtitle.textContent;
  profileFormValidator.disableSubmitButton();
  openPopup(profilePopup);
})

profilePopupButtonClose.addEventListener('click', () => { //Close profile edit form 
  closePopup(profilePopup);
})

profilePopupForm.addEventListener('submit', (event) => { //Save edit form and close
  event.preventDefault();
  profileTitle.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupAbout.value;
  closePopup(profilePopup);
})

/*=================== new card popup event listeners ====================================================*/
cardButtonAdd.addEventListener('click', () => { //Open new card form
  cardForm.reset();
  cardFormValidator.disableSubmitButton();
  openPopup(cardPopup);
})

cardPopupButtonClose.addEventListener('click', () => { //Close new card form 
  closePopup(cardPopup);
})

cardForm.addEventListener('submit', (event) => {  //Create new card
  const data = {
    name: cardPopupTitle.value,
    link: cardPopupLink.value
  }
  event.preventDefault();
  renderCard(makeCardInstance(data, cardTemplate));
})

/**============================== initial runs ======================================================= */
window.onload = () => { //Run on load to create first 6 cards
  for (let i = 0; i < 6; i++) {
    renderCard(makeCardInstance(initialCards[i]));
  }
  cardFormValidator.enableValidation(); //enable forms validation
  profileFormValidator.enableValidation();
}