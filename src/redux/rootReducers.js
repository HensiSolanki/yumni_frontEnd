import { combineReducers } from "@reduxjs/toolkit";
import { headerApiSliceReducer } from "./header/slice";
import { landingPageFilterSliceReducer } from "./landingPageFilter/slice";
import { addListingApiSliceReducer } from "./addlisting/slice";



const rootReducer = combineReducers({
    headerApiSlice: headerApiSliceReducer,
    landingPageFilterSlice: landingPageFilterSliceReducer,
    addListingApiSlice: addListingApiSliceReducer,
})


export default rootReducer;