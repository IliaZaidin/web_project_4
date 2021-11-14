/**====================== imports ============================ */
import Card from "./Card.js";
import { renderCard} from "./index.js";

/**====================== variables ========================= */
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profileButtonSubmit = document.querySelector('.form__submit_type_profile');
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupForm = profilePopup.querySelector('.popup__wrapper_type_profile');
const profilePopupName = profilePopup.querySelector('.form__input_type_name');
const profilePopupAbout = profilePopup.querySelector('.form__input_type_about');
const profilePopupButtonClose = profilePopup.querySelector('.popup__close_type_profile');

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

const overlayPopups = document.querySelectorAll('.popup');

/**====================== functions ========================= */

export function closePopup(popupSelector) { //close popup
    popupSelector.classList.remove('popup_is_opened');
    unsetEscapeListener();
}
  
export function openPopup(element) { //open popup
    element.classList.add('popup_is_opened');
    setEscapeListener();
}

function closeByEscape(event) { //close popups on Escape button
    if (event.key === "Escape") {
      const openPopup = document.querySelector('.popup_is_opened');
      closePopup(openPopup);
    }
}
  
function setEscapeListener() {  //set event listener for escape button
    document.addEventListener('keydown', closeByEscape);
}
  
function unsetEscapeListener() {   //remove event listener for escape button
    document.removeEventListener('keydown', closeByEscape);
}
  
function disableSubmitButton(button) { //disable submit button if form not valid
    button.classList.add('form__submit_disabled');
    button.setAttribute("disabled", true);
}

/**=================== generic event listeners ========================= */
overlayPopups.forEach((element) => {  // close popups if overlay is clicked
    element.addEventListener('mousedown', (event) => {
      const eventTrigger = [...event.target.classList];
      if (eventTrigger.includes('popup_type_card')) {
        closePopup(cardPopup);
      } else if (eventTrigger.includes('popup_type_profile')) {
        closePopup(profilePopup);
      } else if (eventTrigger.includes('popup_type_picture')) {
        closePopup(picturePopup);
      }
    })
  })

  picturePopupClose.addEventListener('click', (event) => {  //Close expanded picture
    closePopup(picturePopup);
  });
  
  /*==================== profile event listeners ===============================*/
  profileButtonEdit.addEventListener('click', () => { //Open profile edit form
    profilePopupName.value = profileTitle.textContent;
    profilePopupAbout.value = profileSubtitle.textContent;
    disableSubmitButton(profileButtonSubmit);
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
    disableSubmitButton(cardButtonSubmit);
    openPopup(cardPopup);
  })
  
  cardPopupButtonClose.addEventListener('click', () => { //Close new card form 
    closePopup(cardPopup);
  })
  
  cardForm.addEventListener('submit', (event) => {  //Create new card
    event.preventDefault();
    const card = new Card([cardPopupTitle.value, cardPopupLink.value], cardTemplate);
    renderCard(card.createCard());
  })
  