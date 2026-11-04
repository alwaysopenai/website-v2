import { useDemoRequest } from "@/context/DemoRequest";
import { DM_CHANNELS, Logo, NeonSign } from "./ui";
import { ArrowUpRight, Bolt, Telegram } from "./Icons";

const EXPLORE = [
  { label: "Services", href: "#services" },
  { label: "Live Demo", href: "#demo" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  const { requestDemo } = useDemoRequest();

  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="container-shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <NeonSign variant="small" />
            <p className="footer-tagline">
              Built to keep your business open,{" "}
              <span className="serif-accent text-lime">always.</span>
            </p>
            <p className="footer-contact">
              <a href="mailto:hello.alwaysopenai@gmail.com">hello.alwaysopenai@gmail.com</a>
              {" · "}
              <a href="https://www.instagram.com/alwaysopen_ai/" target="_blank" rel="noreferrer">Instagram @alwaysopen_ai</a>
              {" · "}
              <a href="https://www.threads.net/@alwaysopen_ai" target="_blank" rel="noreferrer">Threads @alwaysopen_ai</a>
              {" · "}
              <a href="https://www.pinterest.com/alwaysopenai/" target="_blank" rel="noreferrer">Pinterest @alwaysopenai</a>
            </p>
            <div className="footer-dm">
              {DM_CHANNELS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className="dm-btn"
                  onClick={() => requestDemo(id)}
                >
                  <Icon size={13} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-nav">
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                {EXPLORE.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4>Start here</h4>
              <ul>
                <li>
                  <a href="#contact">Get My Free Demo</a>
                </li>
                <li>
                  <a href="#demo">Try the demo bot</a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault();
                      requestDemo("Instagram");
                    }}
                  >
                    Instagram DM
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault();
                      requestDemo("Messenger");
                    }}
                  >
                    Messenger DM
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault();
                      requestDemo("Telegram");
                    }}
                  >
                    Telegram DM
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          <span>AlwaysOpen AI</span>
        </div>

        <div className="footer-bottom">
          <span>© 2026 AlwaysOpen AI</span>
          <span className="footer-built">
            <Bolt size={11} className="footer-built-svg" />
            Your business, open 24/7.
          </span>
          <span className="footer-credit">
            Chatbots · Automation · <Telegram size={10} className="inline align-[-1px] text-lime/50" />
          </span>
          <a href="#top" className="inline-flex items-center gap-1">
            Back to top
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>
    </footer>
  );
}
