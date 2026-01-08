import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import { router } from "@/app/router/router";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { AppInit } from "./app/init/appInit";
import { ModalProvider } from "@/shared/ui/Modal/ModalContext";

import "@/index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ModalProvider>
      <AppInit />
      <RouterProvider router={router} />
    </ModalProvider>
  </Provider>
);
