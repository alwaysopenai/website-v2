import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Eyebrow } from "./ui";

type Token = { text: string; className?: string };

const TOKENS: Token[] = [
  { text: "A" },
  { text: "customer" },
  { text: "writes" },
  { text: "at" },
  { text: "2" },
  { text: "AM.", className: "serif-word glow-amber" },
  { text: "Your" },
  { text: "bot" },
  { text: "answers" },
  { text: "in" },
  { text: "seconds.", className: "glow-green" },
  { text: "You" },
  { text: "wake" },
  { text: "up" },
  { text: "to" },
  { text: "a" },
  { text: "new", className: "glow-green" },
  { text: "lead.", className: "glow-green" },
];

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setLit(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLit(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section statement" id="statement" aria-labelledby="statement-title">
      <div className="statement-glow" aria-hidden="true" />
      <div className="container-shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>The 2 AM problem</Eyebrow>
          <span className="tag-dot">Always on, quietly</span>
        </div>

        <h2 id="statement-title" className="sr-only">
          A customer writes at 2 AM. Your bot answers in seconds. You wake up to a new lead.
        </h2>
        <p
          ref={ref}
          className={cn("statement-copy", lit && "is-lit")}
          aria-hidden="true"
        >
          {TOKENS.map((token, index) => (
            <span
              key={`${token.text}-${index}`}
              className={cn("word", token.className)}
              style={{ "--wi": index } as React.CSSProperties}
            >
              {token.text}
              {index < TOKENS.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </p>

        <div className="statement-foot">
          <p>
            No missed messages. No “we&apos;ll get back to you tomorrow.” Your business keeps
            the light on, even when the whole street is dark.
          </p>
          <div className="night-chip">
            <img
              src="/images/moon.jpg"
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              decoding="async"
            />
            <div>
              <strong>2:00 AM — you&apos;re asleep</strong>
              <span>Your bot is not.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
