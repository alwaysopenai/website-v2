import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/utils/cn";
import { useDemoRequest } from "@/context/DemoRequest";
import { DmLinks, Logo } from "./ui";
import { ArrowUpRight, Close, Menu } from "./Icons";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Demo", href: "#demo" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const { requestDemo } = useDemoRequest();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 28);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    if (lenis) lenis.stop();
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen, lenis]);

  const startDemo = () => {
    setMenuOpen(false);
    requestDemo();
  };

  return (
    <>
      <header className={cn("site-header", scrolled && "is-scrolled")}>
        <div className="container-shell">
          <div className="header-inner">
            <Logo onClick={() => setMenuOpen(false)} />

            <nav className="nav-desktop hidden lg:flex" aria-label="Primary navigation">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href="#contact"
                className="btn btn-primary btn-sm header-cta"
                onClick={(event) => {
                  event.preventDefault();
                  startDemo();
                }}
              >
                Get My Free Demo
                <span className="btn-icon">
                  <ArrowUpRight size={13} />
                </span>
              </a>
              <button
                type="button"
                className="menu-toggle lg:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={19} />
              </button>
            </div>
          </div>
        </div>
        <div
          className="header-progress"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </header>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="container-shell flex-1 flex flex-col">
            <div className="mobile-menu-head">
              <Logo onClick={() => setMenuOpen(false)} />
              <button
                ref={closeRef}
                type="button"
                className="menu-toggle"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <Close size={19} />
              </button>
            </div>

            <nav className="mobile-menu-links" aria-label="Mobile navigation">
              {NAV.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="mobile-menu-link"
                  style={{ animationDelay: `${100 + index * 55}ms` }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mobile-menu-foot">
              <button type="button" className="btn btn-primary w-full" onClick={startDemo}>
                Get My Free Demo
                <span className="btn-icon">
                  <ArrowUpRight size={15} />
                </span>
              </button>
              <div>
                <p className="eyebrow mb-3">Or start with a DM</p>
                <div className="flex flex-wrap gap-2">
                  <DmLinks
                    onSelect={(channel) => {
                      setMenuOpen(false);
                      requestDemo(channel);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="chip">Free demo first</span>
                <span className="chip">Live in 2 to 3 days</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
