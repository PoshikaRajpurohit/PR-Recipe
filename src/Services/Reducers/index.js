import { combineReducers } from "redux";
import recipeReducer from "./RecipeReducer";
const rootReducer = combineReducers({
   recipeReducer,

});
export default rootReducer;