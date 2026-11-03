import { useEffect, useRef, useState } from "react";
import { useDemoRequest } from "@/context/DemoRequest";
import {
  ArrowUpRight,
  Bolt,
  Check,
  Clock,
  Layers,
  Refresh,
  Send,
  Shield,
  Sparkle,
} from "./Icons";
import { DmLinks, Eyebrow, Reveal } from "./ui";

const INTRO =
  "Assalam o Alaikum, I am the AlwaysOpen AI demo bot. Ask me about services, delivery or how to order, or tap a question below.";

type Answer = {
  text: string;
  withDm?: boolean;
};

type Message = Answer & {
  id: number;
  from: "bot" | "user";
};

const QUICK_QUESTIONS: { chip: string; keys: string[]; answer: Answer }[] = [
  {
    chip: "Services",
    keys: ["service", "services", "offer", "chatbot", "automation", "what do you do", "help"],
    answer: {
      text: "Three things: 1) Instagram and Messenger chatbots, 2) Telegram bots, 3) Business automation. All built to keep your business open 24/7.",
    },
  },
  {
    chip: "How fast",
    keys: ["fast", "speed", "quick", "delivery", "deliver", "live", "how long", "days", "time"],
    answer: {
      text: "A standard chatbot goes live in about 2 to 3 days. You see a working demo first, so you can test it before launch.",
    },
  },
  {
    chip: "How to order",
    keys: ["order", "start", "begin", "how do i", "get one", "sign up", "buy", "work with"],
    answer: {
      text: "Easy. Send a DM on Instagram, Messenger or Telegram. The builder learns about your business, then builds your free demo. You pay only if you love it.",
    },
  },
  {
    chip: "Tools you use",
    keys: ["tool", "tools", "manychat", "activepieces", "make", "openai", "stack", "apps"],
    answer: {
      text: "I work with ManyChat, Activepieces, Make and OpenAI. The bots answer on Instagram, Messenger and Telegram.",
    },
  },
  {
    chip: "Is the demo free",
    keys: ["free", "free?", "price", "pricing", "cost", "pay", "payment", "buy", "expensive", "charge"],
    answer: {
      text: "Yes — the demo is free and built for your business first. You pay only if you love it. No prices are published here; the builder will talk you through it in a DM.",
    },
  },
];

const EXTRA_ANSWERS: { keys: string[]; answer: Answer }[] = [
  {
    keys: ["who are you", "what are you", "what is this", "demo", "bot", "alwaysopen", "about you"],
    answer: {
      text: "I am the AlwaysOpen AI demo bot. AlwaysOpen AI builds AI chatbots for small businesses and connects apps so replies, lead logging and follow ups happen on their own.",
    },
  },
  {
    keys: ["refund", "return", "warranty", "shipping", "refund policy", "menu", "hours", "open"],
    answer: {
      text: "That is a question for the builder — this small demo only covers the basics. DM on Instagram, Messenger or Telegram and you will get a straight answer.",
      withDm: true,
    },
  },
  {
    keys: ["where", "location", "based", "country", "meet", "office"],
    answer: {
      text: "The conversation starts in a DM on Instagram, Messenger or Telegram. No call centre, no office visit — just the builder, wherever you are.",
    },
  },
  {
    keys: ["thanks", "thank", "shukriya", "great", "nice", "cool", "perfect"],
    answer: {
      text: "Happy to help. When you are ready, DM the builder for a free demo built around your business.",
    },
  },
  {
    keys: ["own", "ownership", "lock", "account", "control", "mine"],
    answer: {
      text: "You own everything. Your bot is built inside your own accounts — no lock-in, no hostage tricks.",
    },
  },
  {
    keys: ["builder", "human", "person", "agent", "call", "centre", "center", "sales", "talk"],
    answer: {
      text: "You talk to the builder directly. No call centres, no sales agents. Just a DM away.",
    },
  },
  {
    keys: ["instagram", "messenger", "telegram", "facebook", "channel", "apps", "answer on"],
    answer: {
      text: "I answer on Instagram, Messenger and Telegram. Business automation can connect more of your apps with Activepieces and Make.",
    },
  },
  {
    keys: ["cant answer", "can't answer", "cannot answer", "fallback", "unknown", "handover", "human take"],
    answer: {
      text: "If the bot cannot answer a question, it captures the lead and notifies the owner so a real person can step in.",
    },
  },
  {
    keys: ["hi", "hello", "hey", "salam", "assalam", "good morning", "good evening"],
    answer: {
      text: "Hello! Good to see you. Ask about services, delivery, tools or how to order — or tap one of the suggested questions below.",
    },
  },
];

const FALLBACK: Answer = {
  text: "That one is beyond this small demo. It only knows the basics here — for the real thing, DM the builder directly and you'll get a proper answer.",
  withDm: true,
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\w\s'?]/g, " ").replace(/\s+/g, " ").trim();
}

function findAnswer(question: string): Answer {
  const text = normalize(question);
  let best: { score: number; answer: Answer } | null = null;

  for (const entry of [...QUICK_QUESTIONS, ...EXTRA_ANSWERS]) {
    let score = 0;
    for (const key of entry.keys) {
      if (text.includes(key)) score += key.length;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer };
    }
  }

  return best?.answer ?? FALLBACK;
}

function TypingBubble() {
  return (
    <div className="chat-row" aria-label="Demo bot is typing">
      <span className="chat-mini-avatar" aria-hidden="true">
        <img src="/images/robot.jpg" alt="" width={1024} height={1024} loading="lazy" />
      </span>
      <div className="typing-bubble" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

export function Demo() {
  const { requestDemo } = useDemoRequest();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "bot", text: INTRO },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [nudge, setNudge] = useState(true);
  const nextId = useRef(2);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const target = scrollRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = requestAnimationFrame(() => {
      target.scrollTo({
        top: target.scrollHeight,
        behavior: reduced ? "auto" : "smooth",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, typing]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const ask = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || typing) return;
    setNudge(false);

    const answer = findAnswer(trimmed);
    const userMessage: Message = {
      id: nextId.current++,
      from: "user",
      text: trimmed,
    };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    const delay = Math.min(1500, 680 + answer.text.length * 5);
    const timer = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          from: "bot",
          text: answer.text,
          withDm: answer.withDm,
        },
      ]);
      setTyping(false);
    }, delay);
    timers.current.push(timer);
  };

  const reset = () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setTyping(false);
    setInput("");
    setNudge(true);
    nextId.current = 2;
    setMessages([{ id: 1, from: "bot", text: INTRO }]);
  };

  return (
    <section className="section demo-section" id="demo" aria-labelledby="demo-title">
      <div className="container-shell">
        <div className="demo-layout">
          <div className="demo-sticky">
            <Reveal>
              <Eyebrow>Live demo · no signup</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="section-title mt-5" id="demo-title">
                Meet your new{" "}
                <span className="serif-accent text-lime">night shift.</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p className="demo-copy">
                This is a working bot, not a video. Ask about services, delivery or how to
                order — the same way your customers would. It answers from a small, honest set
                of facts.
              </p>
            </Reveal>

            <Reveal delay={190}>
              <ul className="demo-points">
                <li>
                  <span className="demo-point">
                    <Clock size={13} />
                  </span>
                  Answers in seconds, on any hour.
                </li>
                <li>
                  <span className="demo-point">
                    <Shield size={13} />
                  </span>
                  Captures the lead when it does not know the answer.
                </li>
                <li>
                  <span className="demo-point">
                    <Sparkle size={13} />
                  </span>
                  The real build is shaped around your business.
                </li>
              </ul>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-6 flex max-w-[26rem] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3">
                <img
                  src="/images/lead-funnel.jpg"
                  alt="3D contact card being pulled into a glowing inbox funnel"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 flex-none rounded-lg border border-white/10 object-cover"
                />
                <div>
                  <p className="text-[0.72rem] font-semibold leading-snug text-cream/85">
                    Every lead, logged.
                  </p>
                  <p className="mt-0.5 text-[0.64rem] leading-snug text-mist/60">
                    Straight into Google Sheets. No copy-paste.
                  </p>
                </div>
                <Layers size={15} className="ml-auto flex-none text-lime/50" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal delay={290}>
              <p className="demo-aside-note">
                <strong>A small demo on purpose.</strong> It will not pretend to know your
                business. That is what the free, made-for-you version is for.
              </p>
              <button
                type="button"
                className="btn btn-sm btn-secondary mt-4"
                onClick={() => requestDemo()}
              >
                Get this for my business
                <ArrowUpRight size={13} />
              </button>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="phone-wrap">
              <div className="phone-glow" aria-hidden="true" />
              <span className="demo-badge demo-badge--top">
                <Bolt size={11} />
                Try it, it&apos;s live
              </span>
              <div
                className="phone"
                role="group"
                aria-label="AlwaysOpen AI demo chatbot"
              >
                <div className="phone-notch" aria-hidden="true" />
                <div className="phone-screen">
                  <div className="phone-status" aria-hidden="true">
                    <span>2:07 AM</span>
                    <span className="phone-status-icons">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="currentColor" aria-hidden="true">
                        <rect x="0" y="5" width="2" height="3" rx="0.5" />
                        <rect x="3.3" y="3.5" width="2" height="4.5" rx="0.5" />
                        <rect x="6.6" y="1.8" width="2" height="6.2" rx="0.5" />
                        <rect x="9.9" y="0" width="2" height="8" rx="0.5" />
                      </svg>
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                        <path d="M1 2.8a9 9 0 0 1 12 0M3.2 5a6 6 0 0 1 7.6 0M6.9 7.2l.1.1" strokeLinecap="round" />
                      </svg>
                    </span>
                  </div>

                  <div className="chat-head">
                    <span className="chat-avatar">
                      <img
                        src="/images/robot.jpg"
                        alt=""
                        width={1024}
                        height={1024}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <div>
                      <div className="chat-head-name">AlwaysOpen AI</div>
                      <div className="chat-head-status">
                        <span className="online-dot" aria-hidden="true" />
                        Demo bot · online now
                      </div>
                    </div>
                    <button
                      type="button"
                      className="chat-restart"
                      onClick={reset}
                      aria-label="Restart demo conversation"
                      title="Restart conversation"
                    >
                      <Refresh size={13} />
                    </button>
                  </div>

                  <div
                    className="chat-scroll"
                    ref={scrollRef}
                    role="log"
                    aria-live="polite"
                    aria-label="Conversation with the demo bot"
                  >
                    <div className="chat-day">Tonight · a small demo</div>
                    {messages.map((message) =>
                      message.from === "bot" ? (
                        <div className="chat-row" key={message.id}>
                          <span className="chat-mini-avatar" aria-hidden="true">
                            <img
                              src="/images/robot.jpg"
                              alt=""
                              width={1024}
                              height={1024}
                              loading="lazy"
                              decoding="async"
                            />
                          </span>
                          <div className="chat-bubble">
                            {message.text}
                            {message.withDm && (
                              <>
                                <div className="chat-dm-label">Continue in a DM</div>
                                <div className="chat-dm-links">
                                  <DmLinks compact onSelect={(channel) => requestDemo(channel)} />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="chat-row user" key={message.id}>
                          <div className="chat-bubble">{message.text}</div>
                        </div>
                      )
                    )}
                    {typing && <TypingBubble />}
                    {nudge && (
                      <p className="chat-nudge">
                        Pick one below to see me answer.
                      </p>
                    )}
                  </div>

                  <div className="chat-quick-area">
                    <div className="chat-quick-label">
                      <span>Suggested questions</span>
                      <span>Tap to ask</span>
                    </div>
                    <div className="chat-quick" aria-label="Suggested demo questions">
                      {QUICK_QUESTIONS.map(({ chip }) => (
                        <button
                          key={chip}
                          type="button"
                          className="chat-chip"
                          onClick={() => ask(chip)}
                          disabled={typing}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form
                    className="chat-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      ask(input);
                    }}
                  >
                    <label htmlFor="demo-chat-input" className="sr-only">
                      Ask the demo bot a question
                    </label>
                    <input
                      id="demo-chat-input"
                      className="chat-input"
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ask me anything about the service..."
                      autoComplete="off"
                      maxLength={160}
                    />
                    <button
                      type="submit"
                      className="chat-send"
                      aria-label="Send question"
                      disabled={!input.trim() || typing}
                    >
                      <Send size={15} />
                    </button>
                  </form>
                  <p className="chat-footnote">
                    Demo knowledge is limited. DM the builder for the real thing.
                  </p>
                </div>
              </div>
              <span className="demo-badge demo-badge--bottom">
                <Check size={11} />
                No signup needed
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
