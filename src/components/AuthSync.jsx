"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth/slice";
import { getData } from "@/utils/storage";
import {
  clearAuthSessionCookie,
  setAuthSessionCookie,
} from "@/utils/authCookie";

const hasValidSession = (user) =>
  Boolean(user?.token || user?.accessToken);

const AuthSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getData("user");

    if (hasValidSession(user)) {
      setAuthSessionCookie();
      dispatch(setUser(user));
    } else {
      clearAuthSessionCookie();
      dispatch(setUser(null));
    }
  }, [dispatch]);

  return null;
};

export default AuthSync;
