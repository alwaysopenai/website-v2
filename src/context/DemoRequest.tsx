import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLenis } from "lenis/react";
import type { Channel } from "@/components/ui";

type DemoRequestContextValue = {
  preferredChannel: Channel;
  setPreferredChannel: (channel: Channel) => void;
  requestDemo: (channel?: Channel) => void;
};

const DemoRequestContext = createContext<DemoRequestContextValue | null>(null);

export function DemoRequestProvider({ children }: { children: ReactNode }) {
  const [preferredChannel, setPreferredChannel] = useState<Channel>("Instagram");
  const lenis = useLenis();

  const requestDemo = useCallback(
    (channel?: Channel) => {
      if (channel) setPreferredChannel(channel);
      window.setTimeout(() => {
        const target = document.getElementById("contact");
        if (!target) return;
        if (lenis) {
          lenis.scrollTo(target, { offset: -72, duration: 1.25 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 40);
    },
    [lenis]
  );

  const value = useMemo(
    () => ({ preferredChannel, setPreferredChannel, requestDemo }),
    [preferredChannel, requestDemo]
  );

  return <DemoRequestContext.Provider value={value}>{children}</DemoRequestContext.Provider>;
}

export function useDemoRequest() {
  const context = useContext(DemoRequestContext);
  if (!context) {
    throw new Error("useDemoRequest must be used within DemoRequestProvider");
  }
  return context;
}
