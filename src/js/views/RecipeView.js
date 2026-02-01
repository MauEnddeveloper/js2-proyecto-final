import icons from 'url:../../img/icons.svg';

class RecipeView {

  #parentElement = document.querySelector('.recipe');
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this.#data.image}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span>${this.#data.cookTime}</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span>${this.#data.servings}</span>
        </div>
      </div>

      <ul>
        ${(this.#data.ingredients || []).map(ing => `
          <li>${ing.description}</li>
        `).join('')}
      </ul>
    `;
  }

}

export default new RecipeView();
