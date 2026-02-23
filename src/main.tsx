import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import App from "./App.tsx";

import CartCon from "./pages/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartCon>
      <BrowserRouter basename="/aeve">
        {/* 얘만 맨 뒤에 / 안 붙임 */}
        <App />
      </BrowserRouter>
    </CartCon>
  </StrictMode>,
);
