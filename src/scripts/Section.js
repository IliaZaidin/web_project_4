export default class Section {
    constructor({items, renderer}, classSelector) {
        this._items = items;
        this._renderer = renderer;
        this._classSelector = document.querySelector(classSelector);
    }

    renderAll() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        });
    }

    addItem(element) {
        this._classSelector.prepend(element);
    }
}