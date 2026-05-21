import { axiosGet } from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

export const GetUserProfile = () => {
    return axiosGet(API_ROUTER.GET_USER_PROFILE);
};