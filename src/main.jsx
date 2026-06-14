import { StrictMode } from "react";
import "./App.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  // <StrictMode>
  <div data-theme="dark">
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>
  </div>,
  // </StrictMode>,
);
