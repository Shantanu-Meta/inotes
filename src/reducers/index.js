// It combines all reducers files in a single file to access all them.

import { combineReducers } from "redux";
import themeReducer from "./themereducer";

const combine = combineReducers({
    theme: themeReducer
})

export default combine; 