import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@openbitfun/theme-openbitfun/default.css";
import "@openbitfun/ui/styles.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
