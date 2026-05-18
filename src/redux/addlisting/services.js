import { axiosGet, axiosPut } from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const fetchAddListingOptions = () =>
  axiosGet(API_ROUTER.ADD_LISTING_OPTIONS);

export const fetchListingPreference = () =>
  axiosGet(API_ROUTER.ADD_LISTING_PREFERENCE);

export const saveListingPreference = (data) =>
  axiosPut(API_ROUTER.ADD_LISTING_PREFERENCE, data);
