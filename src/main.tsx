import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import "./index.css";
import App from "./App";

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        lerp: reducedMotion ? 1 : 0.085,
        smoothWheel: !reducedMotion,
        syncTouch: false,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.4,
      }}
    >
      <App />
    </ReactLenis>
  </StrictMode>
);
