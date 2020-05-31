import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the application
 *
 *  - Search object
 *  - Current recipe object
 *  - Shopping list object
 *  - Liked recipes
 **/

const state = {};
window.state = state;

/**
 * Search Controller
 */
const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);
    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    try {
      // 4. Search for recipes
      await state.search.getResults();
      // 5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.results);
    } catch (err) {
      console.log('Error processing the search...');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = Number(btn.dataset.goto);
    searchView.clearResults();
    searchView.renderResults(state.search.results, goToPage);
  }
});

/**
 * Recipe Controller
 */
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');
  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);
    try {
      // Create new recipe object
      state.recipe = new Recipe(id);
      // Get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (err) {
      alert('Error processing recipe!');
    }
  }
};

['hashchange', 'load'].forEach((event) => window.addEventListener(event, controlRecipe));

/**
 * List Controller
 */
const controlList = () => {
  // Create a new list IF there is none yet
  if (!state.list) {
    state.list = new List();

    // Add each ingredient to the list
    state.recipe.ingredients.forEach((el) => {
      const item = state.list.addItem(el.count, el.unit, el.ingredient);
      listView.renderItem(item);
    });
  } else {
    state.recipe.ingredients.forEach((el) => {
      // Check for duplicates
      const id = state.list.duplicateID(el.unit, el.ingredient);
      if (!id) {
        // Add ingredients to list if not duplicate
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
      } else {
        // Update count if duplicate
        const count = state.list.getCount(id) + el.count;
        listView.updateItem(id, count);
        state.list.updateCount(id, count);
      }
    });
  }
};

// Handle delete and update list events
elements.shopping.addEventListener('click', (e) => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  // Handle delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete item from state
    state.list.deleteItem(id);
    // Delete from UI
    listView.deleteItem(id);
    // Handle the count update
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

// Handle the count update
elements.shopping.addEventListener('change', (e) => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

/**
 * Likes Controller
 */

// Testing
state.likes = new Likes();
likesView.toggleLikeMenu(state.likes.getNumLikes());

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;
  // User has NOT liked current recipe yet
  if (!state.likes.isLiked(currentID)) {
    // Add like to state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.image
    );
    // Toggle like button
    likesView.toggleLikeBtn(true);
    // Add to UI list
    likesView.renderLike(newLike);
    // User has liked current recipe
  } else {
    // Remove like to state
    state.likes.deleteLike(currentID);
    // Toggle like button
    likesView.toggleLikeBtn(false);
    // Remove to UI list
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Handling recipe buttons clicks
elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});

window.l = new List();
