/**=======================imports ================================ */
import "./index.css";
import Card from "../components/Card.js";
import {
  cardFormValidator, userData, profilePopupInstance, profileFormInstance, 
  cardFormInstance, cardPopupInstance, profileFormValidator,
  cardTemplate, picturePopupInstance, itemsRenderer
} from "../utils/constants.js";


/**====================== constants ========================= */
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupName = profilePopup.querySelector('.form__input_type_name');
const profilePopupAbout = profilePopup.querySelector('.form__input_type_about');
const cardButtonAdd = document.querySelector('.profile__add-button');

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
  profilePopupInstance.open();
})

/*=================== new card popup event listeners ====================================================*/
//Open new card form
cardButtonAdd.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardPopupInstance.open();
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