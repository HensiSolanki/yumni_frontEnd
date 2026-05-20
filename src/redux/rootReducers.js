import { combineReducers } from "@reduxjs/toolkit";
import { headerApiSliceReducer } from "./header/slice";
import { landingPageFilterSliceReducer } from "./landingPageFilter/slice";
import { addListingApiSliceReducer } from "./addlisting/slice";
import { searchOptionsSliceReducer } from "./searchOptions/slice";
import { authSliceReducer } from "./auth/slice";



const rootReducer = combineReducers({
    authSlice: authSliceReducer,
    headerApiSlice: headerApiSliceReducer,
    landingPageFilterSlice: landingPageFilterSliceReducer,
    addListingApiSlice: addListingApiSliceReducer,
    searchOptionsSlice: searchOptionsSliceReducer,
})


export default rootReducer;