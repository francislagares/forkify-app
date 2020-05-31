import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find((el) => el.id === id).count = newCount;
  }

  duplicateID(unit, ingredient) {
    const dupItem = this.items.find((el) => el.ingredient === ingredient && el.unit === unit);
    return dupItem ? dupItem.id : false;
  }

  getCount(id) {
    return this.items.find((el) => el.id === id).count;
  }
}
