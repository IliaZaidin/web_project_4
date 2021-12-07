/**====================== imports ============================= */
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js"
import { userData, profileFormInstance, cardFormInstance, cardTemplate, picturePopupInstance, itemsRenderer } from "./constants.js";


/**============================= functions ============================================ */
export const submitForm = (event, fieldsData) => {
  event.preventDefault();
  if ([...event.target.classList].includes('form_type_profile')) {
    submitProfileForm(fieldsData);
  } else
    submitCardForm(fieldsData);
}

//update profile
function submitProfileForm(fieldsData) {
  userData.setUserInfo(fieldsData.profile_name, fieldsData.profile_job);
  profileFormInstance.close();
}

//create new card
function submitCardForm(fieldsData) {
  const cardData = Array.of(fieldsData);
  itemsRenderer.addItem(cardData);
  cardFormInstance.close();
}

export default function makeCardInstance(cardData) {
  const card = new Card(cardData, cardTemplate, handleCardClick);
  return card.createCard();
}

function handleCardClick(link, text) {
  picturePopupInstance.open(link, text);
}