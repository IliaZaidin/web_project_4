export default class Section {
    constructor({ renderer }, classSelector) {
        this._renderer = renderer; //makeCardInstance in index.js
        this._classContainer = document.querySelector(classSelector);
    }

    addItem(item, myId) {
        this._classContainer.prepend(this._renderer(item, myId)); 
    }

    renderAll(items, myId) {
        items.forEach(item => {
            this.addItem(item, myId);
        });
    }
}