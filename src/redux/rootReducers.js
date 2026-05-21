import { combineReducers } from "@reduxjs/toolkit";
import { headerApiSliceReducer } from "./header/slice";
import { landingPageFilterSliceReducer } from "./landingPageFilter/slice";
import { addListingApiSliceReducer } from "./addlisting/slice";
import { searchOptionsSliceReducer } from "./searchOptions/slice";
import { authSliceReducer } from "./auth/slice";
import { dashboardSliceReducer } from "./dashboard/slice";



const rootReducer = combineReducers({
    authSlice: authSliceReducer,
    dashboardSlice: dashboardSliceReducer,
    headerApiSlice: headerApiSliceReducer,
    landingPageFilterSlice: landingPageFilterSliceReducer,
    addListingApiSlice: addListingApiSliceReducer,
    searchOptionsSlice: searchOptionsSliceReducer,
})


export default rootReducer;