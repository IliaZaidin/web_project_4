const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__edit-form');
const popupName = document.querySelector('.popup__name');
const popupAbout = document.querySelector('.popup__about');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__save');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup () {
  popupName.value = profileTitle.textContent;
  popupAbout.value = profileSubtitle.textContent;
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function saveProfile (event) {
  event.preventDefault();
  profileTitle.textContent = popupName.value;
  profileSubtitle.textContent = popupAbout.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveProfile);