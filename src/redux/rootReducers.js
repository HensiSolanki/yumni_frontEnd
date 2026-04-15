import { combineReducers } from "@reduxjs/toolkit";
import { headerApiSliceReducer } from "./header/slice";
import { landingPageFilterSliceReducer } from "./landingPageFilter/slice";



const rootReducer = combineReducers({
    headerApiSlice: headerApiSliceReducer,
    landingPageFilterSlice: landingPageFilterSliceReducer,
})


export default rootReducer;