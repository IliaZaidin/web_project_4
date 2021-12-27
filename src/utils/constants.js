/**======================= constants ============================== */
export const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
}

// export const initialCards = [
//   {
//     card_title: "Yosemite Valley",
//     card_link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
//   },
//   {
//     card_title: "Lake Louise",
//     card_link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
//   },
//   {
//     card_title: "Bald Mountains",
//     card_link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
//   },
//   {
//     card_title: "Latemar",
//     card_link: "https://code.s3.yandex.net/web-code/latemar.jpg"
//   },
//   {
//     card_title: "Vanoise National Park",
//     card_link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
//   },
//   {
//     card_title: "Lago di Braies",
//     card_link: "https://code.s3.yandex.net/web-code/lago.jpg"
//   }
// ];

export const profileButtonEdit = document.querySelector('.profile__edit-button');
export const profilePopupName = document.querySelector('.form__input_type_name');
export const profilePopupAbout = document.querySelector('.form__input_type_about');
export const profileAvatar = document.querySelector('.profile__picture');
export const cardButtonAdd = document.querySelector('.profile__add-button');
export const cardTemplate = document.querySelector('.card-template').content;
export const confirmButton = document.querySelector('.form__submit_type_confirm');
export const profileSubmitButton = document.querySelector('.form__submit_type_profile');
export const avatarSubmitButton = document.querySelector('.form__submit_type_avatar');
export const cardSubmitButton = document.querySelector('.form__submit_type_card');
export const userName = document.querySelector('.profile__title');
export const userJob = document.querySelector('.profile__subtitle');
export const userAvatar = document.querySelector('.profile__picture');
