import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
	user: userSlice,
	theme: themeReducer,
});

export default rootReducer;
