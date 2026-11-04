import { useDemoRequest } from "@/context/DemoRequest";
import { ArrowDown, ArrowUpRight, Chat, Check, Sparkle } from "./Icons";
import { Eyebrow, Magnetic, NeonSign } from "./ui";

export function Hero({ ready }: { ready: boolean }) {
  const { requestDemo } = useDemoRequest();

  return (
    <section className={`hero ${ready ? "hero-ready" : ""}`} id="top" aria-labelledby="hero-title">
      <div className="container-shell">
        <div className="hero-grid">
          <div>
            <div className="hero-rise" style={{ "--rise-index": 0 } as React.CSSProperties}>
              <Eyebrow>AI chatbots &amp; automation for small business</Eyebrow>
            </div>

            <h1
              id="hero-title"
              className="hero-title hero-rise"
              style={{ "--rise-index": 1 } as React.CSSProperties}
            >
              <span className="line">Your business,</span>
              <span className="line">
                <span className="open-word">open</span>{" "}
                <span className="time-word">
                  24/7<span className="dot">.</span>
                </span>
              </span>
            </h1>

            <p
              className="hero-sub hero-rise"
              style={{ "--rise-index": 2 } as React.CSSProperties}
            >
              AI chatbots that answer your customers in seconds on Instagram, Messenger and
              Telegram — even while you sleep. Built for small businesses, by the person you
              actually talk to.
            </p>

            <div
              className="hero-actions hero-rise"
              style={{ "--rise-index": 3 } as React.CSSProperties}
            >
              <Magnetic>
                <a
                  href="#contact"
                  className="btn btn-primary"
                  onClick={(event) => {
                    event.preventDefault();
                    requestDemo();
                  }}
                >
                  Get My Free Demo
                  <span className="btn-icon">
                    <ArrowUpRight size={15} />
                  </span>
                </a>
              </Magnetic>
              <a href="#demo" className="btn btn-secondary">
                <Chat size={17} className="text-lime" />
                Try the Live Demo
              </a>
            </div>

            <div
              className="hero-trust hero-rise"
              style={{ "--rise-index": 4 } as React.CSSProperties}
            >
              <span className="chip">
                <Sparkle size={13} />
                Free demo first
              </span>
              <span className="chip">
                <Check size={13} />
                Live in 2 to 3 days
              </span>
            </div>

            <p
              className="hero-note hero-rise"
              style={{ "--rise-index": 5 } as React.CSSProperties}
            >
              <span className="online-dot" aria-hidden="true" />
              Always open. Even at 2 AM.
            </p>
          </div>

          <div
            className="hero-art-stage hero-rise"
            style={{ "--rise-index": 3 } as React.CSSProperties}
          >
            <div className="hero-sign">
              <NeonSign variant="hero" flicker />
            </div>

            <div className="hero-moon" aria-hidden="true">
              <img
                src="/images/moon.jpg"
                alt=""
                width={1024}
                height={1024}
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="hero-robot-wrap">
              <img
                src="/images/robot.jpg"
                alt="Friendly AlwaysOpen AI robot assistant wearing a glowing headset and waving"
                width={1024}
                height={1024}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <div className="float-card float-card--chat" aria-hidden="true">
              <span className="float-card-icon">
                <Chat size={15} />
              </span>
              <span>
                <span className="float-card-title">Hi! How can I help?</span>
                <span className="float-card-sub">Replies in seconds</span>
              </span>
            </div>

            <div className="float-card float-card--lead" aria-hidden="true">
              <span className="float-card-icon">
                <Check size={15} />
              </span>
              <span>
                <span className="float-card-title">New lead captured</span>
                <span className="float-card-sub">Logged in Google Sheets</span>
              </span>
            </div>
          </div>
        </div>

        <a href="#statement" className="hero-scroll hero-rise" style={{ "--rise-index": 6 } as React.CSSProperties}>
          Scroll to see what stays open
          <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}
