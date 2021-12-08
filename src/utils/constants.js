/**======================= constants ============================== */
export const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

export const initialCards = [
  {
    card_title: "Yosemite Valley",
    card_link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    card_title: "Lake Louise",
    card_link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    card_title: "Bald Mountains",
    card_link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    card_title: "Latemar",
    card_link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    card_title: "Vanoise National Park",
    card_link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    card_title: "Lago di Braies",
    card_link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

export const profileButtonEdit = document.querySelector('.profile__edit-button');
export const profilePopupName = document.querySelector('.form__input_type_name');
export const profilePopupAbout = document.querySelector('.form__input_type_about');
export const cardButtonAdd = document.querySelector('.profile__add-button');