import { useSyncExternalStore } from "react";
import { getData } from "@/utils/storage";

const subscribeNoop = () => () => {};

const getStoredUser = () => getData("user") || null;

const getStoredUserServer = () => null;

/**
 * Reads the persisted user from localStorage in a hydration-safe way.
 */
export const useStoredUser = () =>
  useSyncExternalStore(subscribeNoop, getStoredUser, getStoredUserServer);
