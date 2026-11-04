import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.5c.7 5.4 3.1 7.8 8.5 8.5-5.4.7-7.8 3.1-8.5 8.5-.7-5.4-3.1-7.8-8.5-8.5 5.4-.7 7.8-3.1 8.5-8.5Z" />
      <path d="M19.5 16.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z" />
    </svg>
  );
}

export function Bolt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13.2 2.5 4.8 13.2h6l-1 8.3 8.4-10.7h-5.9l.9-8.3Z" />
    </svg>
  );
}

export function Chat(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 11.4a8.4 8.4 0 0 1-8.4 8.4H5.2L3 22v-9.8A8.4 8.4 0 1 1 11.4 21" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth={2.2} />
    </svg>
  );
}

export function Send(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m21 3-9.4 18-1.9-7.7L2 11.4 21 3Z" />
      <path d="m9.7 13.3 4.1-4.1" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function Threads(props: IconProps) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...rest}
    >
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        fill="currentColor"
      >
        @
      </text>
    </svg>
  );
}

export function Pinterest(props: IconProps) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...rest}
    >
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        fill="currentColor"
      >
        P
      </text>
    </svg>
  );
}

export function InstagramBrand(props: IconProps) {
  const { size = 40, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <defs>
        <linearGradient id="instaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="25%" stopColor="#fa7e1e" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="75%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#instaGrad)" />
      <rect x="6" y="6" width="12" height="12" rx="3.5" fill="none" stroke="#ffffff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.8" fill="none" stroke="#ffffff" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="#ffffff" />
    </svg>
  );
}

export function ThreadsBrand(props: IconProps) {
  const { size = 40, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <circle cx="12" cy="12" r="11" fill="#000000" />
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        fill="#ffffff"
      >
        @
      </text>
    </svg>
  );
}

export function PinterestBrand(props: IconProps) {
  const { size = 40, ...rest } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <circle cx="12" cy="12" r="11" fill="#e60023" />
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fontFamily="Georgia, serif"
        fill="#ffffff"
      >
        P
      </text>
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" strokeWidth={2.4} />
    </svg>
  );
}

export function Messenger(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3c5.2 0 9.3 3.8 9.3 8.7 0 5-4.1 8.7-9.3 8.7-1.2 0-2.4-.2-3.4-.6L4 21.5l1.2-3.6C3.6 16.4 2.7 14.2 2.7 11.7 2.7 6.8 6.8 3 12 3Z" />
      <path d="m7.3 14 3.1-4.5 2.6 2.2 3.4-2.2-3.1 4.5-2.5-2.2L7.3 14Z" />
    </svg>
  );
}

export function Telegram(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 4.2 2.9 11.1c-.8.3-.8 1.4.1 1.7l4.4 1.4 1.7 5.2c.2.6 1 .8 1.5.3l2.5-2.4 4.5 3.3c.6.4 1.4.1 1.6-.6L22 5.3c.2-.8-.5-1.4-1-.1.2 0-.1 0 0 0Z" />
      <path d="m7.4 14.2 10.4-7.3-8.2 8.4-.3 3.4" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.8 20 6v5.6c0 4.4-3 8.1-8 9.6-5-1.5-8-5.2-8-9.6V6l8-3.2Z" />
      <path d="m8.7 11.8 2.2 2.2 4.4-4.5" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.3 2" />
    </svg>
  );
}

export function Rocket(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13.5 4.5c2.8-2.8 5.5-2 5.5-2s.8 2.7-2 5.5l-3.4 3.4-3.5-3.5 3.4-3.4Z" />
      <path d="M9.9 8.2 5 9.5 4 14l4.6 1.4M15.8 14.1l-1.3 4.9-4.5 1-1.4-4.6" />
      <circle cx="15.5" cy="6.5" r="1.2" />
      <path d="M7.5 16.5c-1.3 1.3-1.5 4-1.5 4s2.7-.2 4-1.5" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 18h4" />
    </svg>
  );
}

export function Wrench(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.4 9.4a2.8 2.8 0 0 1-4-4l9.4-9.4-1-1Z" />
      <path d="M14.7 6.3 17.5 3.5l3 3-2.8 2.8" />
    </svg>
  );
}

export function CheckBadge(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.8 14.6 5l3.3-.3.9 3.2 2.7 2-1.6 2.9.5 3.3-3.3.7-2 2.7-2.9-1.6-3.2.6-.9-3.2-2.6-2 1.7-2.9-.6-3.3 3.3-.7L12 2.8Z" />
      <path d="m8.8 12 2.1 2.1 4.4-4.4" />
    </svg>
  );
}

export function Refresh(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 11a8 8 0 0 0-14.4-4.8L3 9" />
      <path d="M3 4v5h5" />
      <path d="M4 13a8 8 0 0 0 14.4 4.8L21 15" />
      <path d="M21 20v-5h-5" />
    </svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="10" width="15" height="11" rx="3" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      <path d="M12 14.5v2" />
    </svg>
  );
}

export function Layers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

export function Moon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20.5 15.2A8.8 8.8 0 0 1 8.8 3.5 8.8 8.8 0 1 0 20.5 15.2Z" />
    </svg>
  );
}

export function Grid(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </svg>
  );
}

export function Gauge(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="m12 14 4-4" />
      <circle cx="12" cy="15" r="1.4" />
    </svg>
  );
}
