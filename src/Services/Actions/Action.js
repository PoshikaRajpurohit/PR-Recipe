
export const addNewRecipe = (data) => ({
  type: "ADD_RECIPE",
  payload: data,
});
export const getAllRecipes = () => ({
  type: "GET_ALL_RECIPES",
});
export const deleteRecipe = (id) => ({
  type: "DELETE_RECIPE",
  payload: id,
});
export const getRecipe = (id) => ({
  type: "GET_RECIPE",
  payload: id,
});
export const updateRecipe = (data) => ({
  type: "UPDATE_RECIPE",
  payload: data,
});
export const setLoading = () => ({
  type: "LOADING",
});
export const getAllRecipesAsync = () => {
  return (dispatch) => {
    dispatch(setLoading());
    setTimeout(() => {
      dispatch(getAllRecipes());
    }, 2000);
  };
};
