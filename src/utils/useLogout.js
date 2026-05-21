"use client";

import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { useRouter } from "@/i18n/navigation";
import { PATH_AUTH } from "@/routes/path";
import { setUser } from "@/redux/auth/slice";
import { clearAuthSessionCookie } from "@/utils/authCookie";
import { removeData } from "@/utils/storage";

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useCallback(() => {
    removeData("user");
    clearAuthSessionCookie();
    dispatch(setUser(null));
    router.push(PATH_AUTH.login);
  }, [dispatch, router]);
};
