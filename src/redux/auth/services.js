import { axiosGet, axiosPost } from "@/services/axiosHelper";
import { API_ROUTER } from "@/services/apiRouter";

/** Login step 1: matches login form (`fullName`, `mobileNumber`, `password`). */
export const sendAuthOtp = (data) =>
  axiosPost(API_ROUTER.SEND_AUTH_OTP, data);

/** Login step 2: exchange OTP for session. */
export const verifyAuthOtp = (data) =>
  axiosPost(API_ROUTER.VERIFY_AUTH_OTP, data);

/** Password login (alternative to OTP). */
export const loginUser = (data) => axiosPost(API_ROUTER.LOGIN, data);

export const RegisterUser = (data) =>
  axiosPost(API_ROUTER.REGISTER_USER, data);

export const refreshSession = (payload) =>
  axiosPost(API_ROUTER.REFRESH_TOKEN, payload);

export const logoutUser = (payload = {}) =>
  axiosPost(API_ROUTER.LOGOUT, payload);

export const getAuthMe = () => axiosGet(API_ROUTER.AUTH_ME);
