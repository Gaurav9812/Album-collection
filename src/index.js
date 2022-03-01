import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ToastProvider } from "react-toast-notifications";

import App from "./components/App";
import { AlbumProvider } from "./providers/albumProvider";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <AlbumProvider>
        <App />
      </AlbumProvider>
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
