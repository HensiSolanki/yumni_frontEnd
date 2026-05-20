import { API_ROUTER } from "../../services/apiRouter";
import { axiosPost } from "../../services/axiosHelper";

export const registerUser = (data) => {
  return axiosPost(API_ROUTER.REGISTER_USER, data);
};

export const loginUser = (data) => {
  return axiosPost(API_ROUTER.LOGIN_USER, data);
};

export const verifyOtp = (data) => {
  return axiosPost(API_ROUTER.VERIFY_OTP, data);
};
