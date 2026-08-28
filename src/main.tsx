import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import LegalPage from "./LegalPage.tsx";
import { currentRoute } from "./site.ts";

function Root() {
  const page = currentRoute();
  if (page === "privacy" || page === "terms") return <LegalPage kind={page} />;
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

