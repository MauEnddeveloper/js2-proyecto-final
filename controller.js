// 1) Importar íconos
import icons from 'url:./src/img/icons.svg';

// 2) Seleccionar contenedor
const recipeContainer = document.querySelector('.recipe');

// 3) Spinner
const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

// 4) Función principal
const showRecipe = async function () {
  try {
    renderSpinner(recipeContainer);

    const resp = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    const data = await resp.json();

    let recipe = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);

    // 5) MARKUP SIEMPRE dentro de la función
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>

        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text">servings</span>
        </div>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients && recipe.ingredients.length > 0
            ? recipe.ingredients
            .map(
              ing => `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity ?? ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
          `
            )
            .join('')
            : ''}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed by
          <span class="recipe__publisher">${recipe.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${recipe.sourceUrl}" target="_blank">
          <span>Directions</span>
        </a>
      </div>
    `;

    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);

  } catch (error) {
    alert(error);
  }
};

// 6) Llamar función
showRecipe();
