import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";
import { ArrowUpRight, Instagram, Messenger, Telegram } from "./Icons";

export const DM_CHANNELS = [
  {
    id: "Instagram" as const,
    label: "Instagram",
    detail: "Message the builder",
    Icon: Instagram,
    href: "#contact",
  },
  {
    id: "Messenger" as const,
    label: "Messenger",
    detail: "Message the builder",
    Icon: Messenger,
    href: "#contact",
  },
  {
    id: "Telegram" as const,
    label: "Telegram",
    detail: "Message the builder",
    Icon: Telegram,
    href: "#contact",
  },
];

export type Channel = (typeof DM_CHANNELS)[number]["id"];

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href="#top"
      className={cn("logo-link", className)}
      aria-label="AlwaysOpen AI — back to top"
      onClick={onClick}
    >
      <NeonSign variant="mark" />
      <span className="logo-word">
        AlwaysOpen<span> AI</span>
      </span>
    </a>
  );
}

export function NeonSign({
  variant = "hero",
  className,
  caption = true,
  flicker = false,
}: {
  variant?: "hero" | "small" | "mark";
  className?: string;
  caption?: boolean;
  flicker?: boolean;
}) {
  const letters = "OPEN".split("");
  return (
    <div
      className={cn("neon-sign", `neon-sign--${variant}`, flicker && "neon-flicker", className)}
      role="img"
      aria-label="Glowing neon OPEN sign"
    >
      <div className={cn("neon-sign-inner", variant !== "mark" && "aspect-[2.02/1]")}>
        <span className="neon-word" aria-hidden="true">
          {letters.map((letter, i) => (
            <span key={`${letter}-${i}`} className={cn("neon-letter", flicker && "")}
              style={flicker ? ({ "--d": `${i * -0.4}s` } as CSSProperties) : undefined}
            >
              {letter}
            </span>
          ))}
        </span>
      </div>
      {caption && (
        <span className="sign-caption" aria-hidden="true">
          24 / 7
        </span>
      )}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
  noDot = false,
}: {
  children: ReactNode;
  className?: string;
  noDot?: boolean;
}) {
  return (
    <span className={cn("eyebrow", className)}>
      {!noDot && <span className="eyebrow-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  copy,
  className,
  titleClassName,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  copy?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("section-head", className)}>
      <div>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2 className={cn("section-title mt-5", titleClassName)}>{title}</h2>
        </Reveal>
      </div>
      {copy && (
        <Reveal delay={140}>
          <p className="section-head-copy lg:ml-auto">{copy}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(className)}
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Magnetic({
  children,
  className,
  strength = 10,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const canMagnetize = () => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  };

  const handleMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!canMagnetize() || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength * 1.4;
    setOffset({ x, y });
  };

  return (
    <span
      ref={ref}
      className={cn("inline-flex", className)}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
      onPointerMove={handleMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </span>
  );
}

export function DmLinks({
  onSelect,
  className,
  compact = false,
}: {
  onSelect?: (channel: Channel) => void;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {DM_CHANNELS.map(({ id, label, Icon }) => (
        <a
          key={id}
          href="#contact"
          className={compact ? "chat-dm-link" : "dm-btn"}
          onClick={(event) => {
            if (onSelect) {
              event.preventDefault();
              onSelect(id);
            }
          }}
          aria-label={`Start a ${label} conversation`}
        >
          <Icon size={compact ? 11 : 14} />
          {label}
          {!compact && <ArrowUpRight size={13} className="opacity-60" />}
        </a>
      ))}
    </div>
  );
}

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function ChannelIcon({
  channel,
  size = 14,
}: {
  channel: Channel;
  size?: number;
}) {
  const channelData = DM_CHANNELS.find((item) => item.id === channel);
  if (!channelData) return null;
  const { Icon } = channelData;
  return <Icon size={size} />;
}
