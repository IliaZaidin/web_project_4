/**=======================imports ================================ */
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section.js";
import { settings, initialCards, profileButtonEdit, profilePopupName, profilePopupAbout, cardButtonAdd } from "../utils/constants.js";

/**================================= Classes Instances=================================================== */
const profileFormValidator = new FormValidator(settings, document.querySelector('.form_type_profile'));
const cardFormValidator = new FormValidator(settings, document.querySelector('.form_type_card'));
const userData = new UserInfo({ name: '.profile__title', job: '.profile__subtitle' });
const profileFormInstance = new PopupWithForm(submitProfileForm, '.popup_type_profile');
const cardFormInstance = new PopupWithForm(submitCardForm, '.popup_type_card');
const itemsRenderer = new Section({ items: initialCards, renderer: makeCardInstance }, ".picture-grid");
const cardTemplate = document.querySelector('.card-template').content;
const picturePopupInstance = new PopupWithImage('.popup_type_picture');

/**============================= functions ============================================ */
//update profile
export function submitProfileForm(event, fieldsData) {
  event.preventDefault();
  userData.setUserInfo(fieldsData.profile_name, fieldsData.profile_job);
  profileFormInstance.close();
}

//create new card
export function submitCardForm(event, fieldsData) {
  event.preventDefault();
  itemsRenderer.addItem(fieldsData);
  cardFormInstance.close();
}

export default function makeCardInstance(cardData) {
  const card = new Card(cardData, cardTemplate, handleCardClick);
  return card.createCard();
}

function handleCardClick(link, text) {
  picturePopupInstance.open(link, text);
}

/*==================== profile event listeners ===============================*/
//Open profile edit form
profileButtonEdit.addEventListener('click', () => {
  const {name, job} = userData.getUserInfo();
  profilePopupName.value = name;
  profilePopupAbout.value = job;
  profileFormValidator.resetValidation();
  profileFormInstance.open();
})

/*=================== new card popup event listeners ====================================================*/
//Open new card form
cardButtonAdd.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardFormInstance.open();
})

/**============================== initial runs =======================================================*/
window.onload = () => {
  //create first 6 cards
  itemsRenderer.renderAll();

  //enable forms validation
  cardFormValidator.enableValidation();
  profileFormValidator.enableValidation();

  //enable event listeners
  picturePopupInstance.setEventListeners();
  profileFormInstance.setEventListeners();
  cardFormInstance.setEventListeners();
}