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
  