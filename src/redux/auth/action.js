import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { saveData } from "@/utils/storage";



export const registerAction = createAsyncThunk(
    "authSlice/registerAction",
    async (payload, { rejectWithValue }) => {
      try {
        const { data, status } = await RegisterUser(payload);
        saveData("user", data);
        return data;
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
        if (err instanceof AxiosError) {
          return rejectWithValue(err?.response?.data?.message);
        }
        return rejectWithValue(err.message);
      }
    }
  );