import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RegisterUser } from "@/redux/auth/services";
import { getApiErrorMessage, getApiPayload, isHttpOk } from "@/utils/apiResponse";

export const registerAction = createAsyncThunk(
  "authSlice/registerAction",
  async (payload, { rejectWithValue }) => {
    const res = await RegisterUser(payload);

    if (isHttpOk(res)) {
      return getApiPayload(res);
    }

    const message = getApiErrorMessage(res, "Registration failed");
    toast.error(message);
    return rejectWithValue(message);
  },
);
