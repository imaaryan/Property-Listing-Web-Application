import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Theme
        accentColor="indigo"
        grayColor="slate"
        panelBackground="solid"
        scaling="100%"
        radius="medium"
      >
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
