const initialState = {
  recipes: [],
  recipe: null,
  isLoading: false,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RECIPE": {
      const newRecipes = [...state.recipes, action.payload].filter(reci => reci != null);
      localStorage.setItem("recipes", JSON.stringify(newRecipes));
      return { ...state, recipes: newRecipes };
    }
    case "GET_ALL_RECIPES": {
      const allRecipes = (JSON.parse(localStorage.getItem("recipes")) || []).filter(reci => reci != null);
      return { ...state, recipes: allRecipes, isLoading: false };
    }
    case "GET_RECIPE": {
      const all = (JSON.parse(localStorage.getItem("recipes")) || []).filter(reci => reci != null);
      const found = all.find((reci) => reci && reci.id === action.payload);
      return { ...state, recipe: found || null };
    }
    case "DELETE_RECIPE": {
      const filtered = state.recipes.filter((reci) => reci && reci.id !== action.payload);
      localStorage.setItem("recipes", JSON.stringify(filtered));
      return { ...state, recipes: filtered };
    }
    case "UPDATE_RECIPE": {
      const updated = state.recipes.map((reci) =>
        reci && reci.id === action.payload.id ? action.payload : reci
      );
      localStorage.setItem("recipes", JSON.stringify(updated.filter(reci => reci != null)));
      return { ...state, recipes: updated, recipe: null };
    }
    case "LOADING":
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
export default recipeReducer;



