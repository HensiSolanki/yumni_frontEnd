import { combineReducers } from "@reduxjs/toolkit";
import { headerApiSliceReducer } from "./header/slice";



const rootReducer = combineReducers({
    headerApiSlice: headerApiSliceReducer,
})


export default rootReducer;