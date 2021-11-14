/**=======================imports ================================ */
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {openPopup, closePopup} from "./utils.js";

/**=======================variables ============================== */
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

const cardPopup = document.querySelector('.popup_type_card');
const cardTemplate = document.querySelector('.card-template').content;
const cardWrapper = document.querySelector('.picture-grid');

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

/**======================= functions ====================================== */
export function renderCard(element) { //render new card
  cardWrapper.prepend(element);
  closePopup(cardPopup);
}

function makeFormValidators () {
  const forms = document.querySelectorAll(".form");

  forms.forEach((formElement) => {
    const newFormValidator = new FormValidator (settings, formElement);
    newFormValidator.enableValidation();
  })
}

/**============================== initial runs ======================================================= */
window.onload = () => { //Run on load to create first 6 cards
  for (let i = 0; i < 6; i++) {
    const card = new Card(initialCards[i], cardTemplate);
    renderCard(card.createCard());
  }
}

makeFormValidators(); //create validators for the popup forms