/**=======================variables ============================== */
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileButtonEdit = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupForm = profilePopup.querySelector('.popup__wrapper_type_profile');
const profilePopupName = profilePopup.querySelector('.popup__input_type_name');
const profilePopupAbout = profilePopup.querySelector('.popup__input_type_about');
const profilePopupButtonClose = profilePopup.querySelector('.popup__close_type_profile');

const cardButtonAdd = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_card');
const cardPopupForm = cardPopup.querySelector('.popup__wrapper_type_card');
const cardPopupTitle = cardPopup.querySelector('.popup__input_type_title');
const cardPopupLink = cardPopup.querySelector('.popup__input_type_link');
const cardPopupButtonClose = cardPopup.querySelector('.popup__close_type_card');
const cardTemplate = document.querySelector('.card-template').content;
const cardWrapper = document.querySelector('.picture-grid');
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const picturePopup = document.querySelector('.popup_type_picture');
const picturePopupTitle = document.querySelector('.popup__title_type_picture');
const picturePopupLink = document.querySelector('.popup__picture');
const picturePopupClose = document.querySelector('.popup__close_type_picture');

/**==================== functions =========================================== */
function createCard(name, link) { //Create card
  const cardCreator = cardTemplate.querySelector('.picture-grid__item').cloneNode(true);
  cardCreator.querySelector('.picture-grid__title').textContent = name;
  cardCreator.querySelector('.picture-grid__img').src = link;
  cardCreator.querySelector('.picture-grid__img').alt = name;
  return cardCreator;
};

function renderCard(element) { //render new card
  cardWrapper.prepend(element);
  cardPopupForm.reset();
  closePopup(cardPopup);
};

function runOnLoad() { //Run on load to create first 6 cards
  for (let i = 0; i < 6; i++) {
    const tempCardHolder = createCard(initialCards[i].name, initialCards[i].link);
    renderCard(tempCardHolder);
  };
};

function closePopup(element) { //close popup
  element.classList.remove('popup_is_opened');
};

function openPopup(element) { //open popup
  element.classList.add('popup_is_opened');
};

/*==================== profile event listeners ===============================*/
profileButtonEdit.addEventListener('click', () => { //Open profile edit form
  profilePopupName.value = profileTitle.textContent;
  profilePopupAbout.value = profileSubtitle.textContent;
  openPopup(profilePopup);
});

profilePopupButtonClose.addEventListener('click', () => { //Close profile edit form 
  closePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', (event) => { //Save edit form and close
  event.preventDefault();
  profileTitle.textContent = profilePopupName.value;
  profileSubtitle.textContent = profilePopupAbout.value;
  closePopup(profilePopup);
});

/*=================== cardPopup event listeners ====================================================*/

cardButtonAdd.addEventListener('click', () => { //Open new card form
  closePopup(cardPopup);
  openPopup(cardPopup);
});

cardPopupButtonClose.addEventListener('click', () => { //Close new card form 
  closePopup(cardPopup);
});

cardPopupForm.addEventListener('submit', (event) => {  //Create new card
  event.preventDefault();
  const tempCardHolder = createCard(cardPopupTitle.value, cardPopupLink.value);
  renderCard(tempCardHolder);
});

/*================================ cards event listeners ============================================*/
cardWrapper.addEventListener('click', (event) => {
  const eventTrigger = event.target.classList.value;

  switch (eventTrigger) {
    case 'picture-grid__like': //Toggle like button on
      event.target.classList.toggle('picture-grid__like_active');
      break;

    case 'picture-grid__like picture-grid__like_active': //Toggle like button off
      event.target.classList.toggle('picture-grid__like_active');
      break;
      
    case 'picture-grid__delete': //Delete card
      let card = event.target.closest('.picture-grid__item');
      card.remove();
      card = null;
      break;

    case 'picture-grid__img': //Expand picture
      picturePopupLink.setAttribute('src', event.target.src);
      picturePopupTitle.textContent = event.target.nextElementSibling.textContent;
      openPopup(picturePopup);
      break;
  }
});

picturePopupClose.addEventListener('click', (event) => {  //Close expanded picture
  closePopup(picturePopup);
});
