import { GetUserProfile } from "./service";

export const getUserProfileAction = createAsyncThunk(
    "dashboardSlice/getUerProfileAction",
    async (payload, { rejectWithValue }) => {
      try {
        const result = await GetUserProfile(payload);

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