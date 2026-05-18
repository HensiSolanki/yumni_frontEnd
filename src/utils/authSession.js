import { getData, removeData, saveData } from "@/utils/storage";

const AUTH_CHANGED = "auth-changed";

export function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_CHANGED));
  }
}

export function persistAuthSession(apiData) {
  if (!apiData?.accessToken) return null;

  const session = {
    token: apiData.accessToken,
    refreshToken: apiData.refreshToken,
    user: apiData.user ?? null,
  };

  saveData("user", session);
  notifyAuthChanged();
  return session;
}

export function getAuthSession() {
  return getData("user") || null;
}

export function isAuthenticated() {
  return Boolean(getAuthSession()?.token);
}

export function clearAuthSession() {
  removeData("user");
  notifyAuthChanged();
}

export { AUTH_CHANGED };
