import { StrictMode, version as reactVersion } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./style.css";

console.info(`React version ${reactVersion}`);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
