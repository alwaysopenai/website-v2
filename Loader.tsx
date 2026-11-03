import { useCallback, useEffect, useRef, useState } from "react";
import { NeonSign } from "./ui";

export function Loader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setProgress(100);
    setLeaving(true);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 520 : 2050;
    const started = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setProgress(Math.round(eased * 100));
      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finish]);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(onFinish, 620);
    return () => window.clearTimeout(timer);
  }, [leaving, onFinish]);

  return (
    <div
      className={`loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`Opening AlwaysOpen AI. Loading ${progress} percent.`}
    >
      <div className="loader-top">
        <span className="logo-word">
          AlwaysOpen<span> AI</span>
        </span>
        <span className="eyebrow" style={{ letterSpacing: "0.14em" }}>
          AI chatbots for small business
        </span>
      </div>

      <div className="loader-center">
        <div className="loader-sign-wrap">
          <NeonSign variant="hero" flicker />
        </div>
        <div className="loader-caption">
          <span className="dot" aria-hidden="true" />
          Opening the shop
        </div>
      </div>

      <div className="loader-bottom">
        <button className="loader-skip" type="button" onClick={finish}>
          Skip intro
        </button>
        <div className="loader-count" aria-hidden="true">
          {String(progress).padStart(2, "0")}
          <sup>%</sup>
        </div>
      </div>
      <div className="loader-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
