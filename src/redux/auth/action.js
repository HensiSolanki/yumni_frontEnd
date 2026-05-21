import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { setAuthSessionCookie } from "@/utils/authCookie";
import { getData, saveData } from "@/utils/storage";
import { loginUser, registerUser, verifyOtp } from "./services";



const getApiErrorMessage = (result, fallback = "Something went wrong") =>
  result?.message || result?.data?.message || fallback;

const getApiSuccessMessage = (result, fallback) =>
  result?.data?.message || result?.message || fallback;

const isApiFailure = (result) =>
  result?.status === false || result?.data?.success === false;

const persistLoginSession = (apiData) => {
  const session = apiData?.data ?? apiData;
  const token = session?.accessToken ?? session?.token ?? apiData?.token;
  if (!token) return;

  const profile = session?.user ?? apiData?.user;
  saveData("user", {
    ...(profile && typeof profile === "object" ? profile : {}),
    token,
    refreshToken: session?.refreshToken ?? apiData?.refreshToken,
  });
  setAuthSessionCookie();
};

export const registerAction = createAsyncThunk(
  "authSlice/registerAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await registerUser(payload);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result);
        toast.error(message);
        return rejectWithValue(message);
      }

      saveData("user", result.data);
      if (result.data?.token) {
        setAuthSessionCookie();
      }
      toast.success(
        getApiSuccessMessage(result, "Account created successfully")
      );
      return result.data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  }
);

export const loginAction = createAsyncThunk(
  "authSlice/loginAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await loginUser(payload);

      if (isApiFailure(result)) {
        const message = getApiErrorMessage(result);
        toast.error(message);
        return rejectWithValue(message);
      }

      const data = result.data;
      persistLoginSession(data);

      toast.success(getApiSuccessMessage(result, "Login successful"));
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  }
);

export const verifyOtpAction = createAsyncThunk(
  "authSlice/verifyOtpAction",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await verifyOtp(payload);
      const data = result?.data;

      if (isApiFailure(result) || data?.success !== true) {
        const message = getApiErrorMessage(result);
        toast.error(message);
        return rejectWithValue(message);
      }

      const existingUser = getData("user") || {};
      const sessionUser = {
        ...existingUser,
        ...data,
        token: data?.token ?? existingUser?.token,
        fullName: data?.fullName ?? existingUser?.fullName,
        mobileNumber: data?.mobileNumber ?? existingUser?.mobileNumber,
      };

      saveData("user", sessionUser);
      setAuthSessionCookie();

      toast.success(getApiSuccessMessage(result, "OTP verified successfully"));
      return { ...sessionUser, success: true };
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";
      toast.error(message);
      if (err instanceof AxiosError) {
        return rejectWithValue(err?.response?.data?.message ?? message);
      }
      return rejectWithValue(message);
    }
  }
);