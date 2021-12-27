/**=======================imports ================================ */
import "regenerator-runtime/runtime";
import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator";
import UserInfo from "../components/UserInfo";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  settings, profileButtonEdit, profilePopupName, profilePopupAbout,
  profileAvatar, cardButtonAdd, cardTemplate, confirmButton,
  profileSubmitButton, avatarSubmitButton, cardSubmitButton,
  userName, userJob, userAvatar
} from "../utils/constants.js";

/**================================= Classes Instances=================================================== */
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  token: "3818518a-0f00-4af2-b13c-93949a3b17de"
});
const profileFormValidator = new FormValidator(settings, document.querySelector('.form_type_profile'));
const cardFormValidator = new FormValidator(settings, document.querySelector('.form_type_card'));
const avatarFormValidator = new FormValidator(settings, document.querySelector('.form_type_avatar'));

const profileFormInstance = new PopupWithForm(submitProfileForm, '.popup_type_profile');
const cardFormInstance = new PopupWithForm(submitCardForm, '.popup_type_card');
const avatarFormInstance = new PopupWithForm(submitAvatarForm, '.popup_type_avatar');

const itemsRenderer = new Section({ renderer: makeCardInstance }, ".picture-grid");
const userData = new UserInfo(userName, userJob, userAvatar);
const picturePopupInstance = new PopupWithImage('.popup_type_picture');
const cardDeletePopup = new PopupWithConfirmation('.popup_type_confirm', confirmButton);

/**============================= functions ============================================ */
//update profile
export function submitProfileForm(event, fieldsData) {
  event.preventDefault();
  profileSubmitButton.textContent = "Saving...";
  api.editProfile(fieldsData.profile_name, fieldsData.profile_job)
    .then(profile => {
      userData.setUserInfo(profile.name, profile.about);
    })
    .catch((err) => {
      window.alert("Something went wrong. Please cancel and try again.");
      console.log("Error: ", err.status, err.statusText);
    })
    .finally(() => {
      profileFormInstance.close();
      profileSubmitButton.textContent = "Save";
    });
}

//update profile avatar
function submitAvatarForm(event, fieldsData) {
  event.preventDefault();
  avatarSubmitButton.textContent = "Saving...";
  api.updateProfilePicture(fieldsData.avatar_link)
    .then(profile => {
      userData.setUserAvatar(profile.avatar);
    })
    .catch((err) => {
      window.alert("Something went wrong. Please cancel and try again.");
      console.log("Error: ", err.status, err.statusText);
    })
    .finally(() => {
      avatarFormInstance.close();
      avatarSubmitButton.textContent = "Save";
    });
}

//create new card
function submitCardForm(event, fieldsData) {
  event.preventDefault();
  cardSubmitButton.textContent = "Saving...";
  api.getUserData()
    .then(data => {
      api.addCard(fieldsData.card_title, fieldsData.card_link)
        .then(card => {
          itemsRenderer.addItem(card, data._id); //called as renderer in Section.js
        })
        .catch((err) => {
          window.alert("Something went wrong. Please cancel and try again.");
          console.log("Error: ", err.status, err.statusText);
        })
        .finally(() => {
          cardSubmitButton.textContent = "Create";
          cardFormInstance.close();
        });
    })
}

function makeCardInstance(cardData, myId) {  //called as renderer in Section.js
  const card = new Card(cardData, myId, cardTemplate, handleCardClick, api, cardDeletePopup);
  return card.createCard();
}

function handleCardClick(link, text) {
  picturePopupInstance.open(link, text);
}

function loadCardsFromServer(myId) {
  api.getCards()
    .then(cards => {
      itemsRenderer.renderAll(cards, myId); //in Section.js
    })
    .catch((err) => {
      console.log("Error: ", err.status, err.statusText);
    });
}

function loadDataFromServer() {
  api.getUserData()
    .then(data => {
      userData.setUserInfo(data.name, data.about);
      userData.setUserAvatar(data.avatar);
      loadCardsFromServer(data._id);
    })
    .catch((err) => {
      console.log("Error: ", err.status, err.statusText);
    });
}

/*==================== profile event listener ===============================*/
//Open profile edit form
profileButtonEdit.addEventListener('click', () => {
  const { name, job } = userData.getUserInfo();
  profilePopupName.value = name;
  profilePopupAbout.value = job;
  profileFormValidator.resetValidation();
  profileFormInstance.setEventListeners();
  profileFormInstance.open();
})

/*=================== new card popup event listener ====================================================*/
//Open new card form
cardButtonAdd.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardFormInstance.setEventListeners();
  cardFormInstance.open();
})

/**================== edit user's avatar event listener ================================================== */
profileAvatar.addEventListener('click', () => {
  avatarFormValidator.resetValidation();
  avatarFormInstance.setEventListeners();
  avatarFormInstance.open();
})

/**============================== initial runs =======================================================*/
window.onload = () => {
  //load initial cards from the server
  loadDataFromServer();

  //enable forms validation
  cardFormValidator.enableValidation();
  profileFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
}