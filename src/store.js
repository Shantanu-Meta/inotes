import { configureStore } from "@reduxjs/toolkit";
import combine from "./reducers";

const store = configureStore({reducer: combine}, {}); 
export default store;