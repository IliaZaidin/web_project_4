/**======================= imports ================================ */
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {submitForm} from "./utils.js";
import Section from "../components/Section.js";
import makeCardInstance from "./utils.js";
import PopupWithImage from "../components/PopupWithImage.js";

/**======================= constants ============================== */
const settings = {
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

  export const profileFormValidator = new FormValidator(settings, document.querySelector('.form_type_profile'));
  export const cardFormValidator = new FormValidator(settings, document.querySelector('.form_type_card'));
  export const userData = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' });
  
  export const profilePopupInstance = new Popup('.popup_type_profile');
  export const cardPopupInstance = new Popup('.popup_type_card');
  
  export const profileFormInstance = new PopupWithForm(submitForm, '.popup_type_profile');
  export const cardFormInstance = new PopupWithForm(submitForm, '.popup_type_card');

  export const itemsRenderer = new Section({ items: initialCards, renderer: makeCardInstance }, ".picture-grid");

  export const cardTemplate = document.querySelector('.card-template').content;

  export const picturePopupInstance = new PopupWithImage('.popup_type_picture');