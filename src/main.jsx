import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Importando Poppins con todos sus weights
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

// Importando Inria Serif con todos sus weights
import "@fontsource/inria-serif/300.css";
import "@fontsource/inria-serif/400.css";
import "@fontsource/inria-serif/700.css";

// Importando Italianno
import "@fontsource/italianno/400.css";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
