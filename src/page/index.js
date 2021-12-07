/**=======================imports ================================ */
import "./index.css"; 
import { cardFormValidator, userData, profilePopupInstance, profileFormInstance, cardFormInstance, cardPopupInstance, itemsRenderer, profileFormValidator,   picturePopupInstance } from "../utils/constants.js";

/**====================== constants ========================= */
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupName = profilePopup.querySelector('.form__input_type_name');
const profilePopupAbout = profilePopup.querySelector('.form__input_type_about');
const cardButtonAdd = document.querySelector('.profile__add-button');

/*==================== profile event listeners ===============================*/
//Open profile edit form
profileButtonEdit.addEventListener('click', () => {
  profilePopupName.value = userData.getUserInfo().name;
  profilePopupAbout.value = userData.getUserInfo().job;
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