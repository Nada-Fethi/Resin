// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./index.css";
import { Provider } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { StrictMode } from "react";
import store from "./redux/store.js";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";
import "remixicon/fonts/remixicon.css";



createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>

);