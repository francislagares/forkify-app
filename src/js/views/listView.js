import { elements } from './base';

export const renderItem = (item) => {
  const html = `
    <li class="shopping__item" data-itemid=${item.id}>
      <div class="shopping__count">
        <input type="number" min="0" value="${item.count}" step="${item.count}" class="shopping__count-value"/>
        <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingredient}</p>
      <button class="shopping__delete btn-tiny">
        <svg>
          <use href="img/sprite.svg#icon-circle-with-cross"></use>
        </svg>
      </button>
    </li>
    `;
  elements.shopping.insertAdjacentHTML('beforeend', html);
};

export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) item.parentElement.removeChild(item);
};

export const updateItem = (id, count) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  if (item) {
    item.querySelector('.shopping__count-value').value = count;
  }
};