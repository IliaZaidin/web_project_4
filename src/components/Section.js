export default class Section {
    constructor({items, renderer}, classSelector) {
        this._items = items;
        this._renderer = renderer;
        this._classContainer = document.querySelector(classSelector);
    }

    renderAll() {
        this._items.forEach(item => {
            this.addItem(item);
        });
    }

    addItem(item) {
        this._classContainer.prepend(this._renderer(item));
    }
}