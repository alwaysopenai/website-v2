import { useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { DemoRequestProvider } from "@/context/DemoRequest";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Statement } from "@/components/Statement";
import { Services } from "@/components/Services";
import { Demo } from "@/components/Demo";
import { HowItWorks } from "@/components/HowItWorks";
import { Promises } from "@/components/Promises";
import { Tools } from "@/components/Tools";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  const lenis = useLenis();
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading, lenis]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (elements.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const target = event.target as Element | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const node = document.getElementById(href.slice(1));
      if (!node) return;

      event.preventDefault();
      const offset = href === "#top" || href === "#main" ? 0 : -74;
      if (lenis) {
        lenis.scrollTo(node, { offset, duration: 1.1 });
      } else {
        const top = node.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({
          top,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      }
      window.history.replaceState(null, "", href);
    };

    document.addEventListener("click", handleAnchor);
    return () => document.removeEventListener("click", handleAnchor);
  }, [lenis]);

  return (
    <DemoRequestProvider>
      {loading && <Loader onFinish={finishLoading} />}

      <a
        href="#main"
        className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero ready={!loading} />
        <Marquee />
        <Statement />
        <Services />
        <Demo />
        <HowItWorks />
        <Promises />
        <Tools />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </DemoRequestProvider>
  );
}
