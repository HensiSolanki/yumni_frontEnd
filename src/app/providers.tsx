"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import ToastWrapper from "@/components/toastWrapper/index";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ToastWrapper />
      {children}
    </Provider>
  );
}
