import * as model from './src/js/model.js';
import recipeView from './src/js/views/RecipeView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
 
    // spinner desde la vista
    recipeView.renderSpinner();

    // cargar datos
    await model.loadRecipe(id);

    // pintar receta
    recipeView.render(model.state.recipe);

  } catch (err) {
    console.error('CONTROL ERROR:', err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
