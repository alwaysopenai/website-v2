import { cn } from "@/utils/cn";
import { Bolt, Clock, Instagram, Layers, Messenger, Telegram } from "./Icons";
import { useInView } from "./ui";

const ITEMS = [
  { label: "Instagram", Icon: Instagram },
  { label: "Messenger", Icon: Messenger },
  { label: "Telegram", Icon: Telegram },
  { label: "Automation", Icon: Layers },
  { label: "24/7", Icon: Clock },
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {[...ITEMS, ...ITEMS].map(({ label, Icon }, index) => (
        <span className="marquee-item" key={`${label}-${index}`}>
          <Icon size={15} />
          {label}
          <Bolt size={10} className="marquee-separator" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  return (
    <div
      className={cn("marquee-band")}
      ref={ref}
      data-paused={!inView}
      aria-label="AlwaysOpen AI works across Instagram, Messenger, Telegram, automation and 24/7 availability"
    >
      <div className="marquee-track">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </div>
  );
}
