import { createSlice } from "@reduxjs/toolkit";
import { loginAction, registerAction, verifyOtpAction } from "./action";

const initialState = {
    user: null,
    otp: null,
    isLoading: false,
    error: null,
    token: null,
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload;
        },
        setOtp: (state, { payload }) => {
            state.otp = payload;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        setToken: (state, { payload }) => {
            state.token = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.otp = payload?.otp ?? payload?.data?.otp ?? null;
                state.token = payload?.data?.accessToken ?? payload?.data?.accessToken ?? null;
            })
            .addCase(registerAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(loginAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.user = payload;
                state.otp = payload?.otp ?? payload?.data?.otp ?? null;
                state.token = payload?.data?.accessToken ?? payload?.data?.accessToken ?? null;
            })
            .addCase(loginAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(verifyOtpAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyOtpAction.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.user = payload;
                state.token = payload?.data?.accessToken ?? payload?.data?.accessToken ?? null;
            })
            .addCase(verifyOtpAction.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
    },
});

export const authSliceReducer = authSlice.reducer;

export const {
    setUser,
    setIsLoading,
    setError,
    setOtp,
    setToken
} = authSlice.actions;