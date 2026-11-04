import { useState } from "react";
import { useDemoRequest } from "@/context/DemoRequest";
import { ArrowUpRight, Plus } from "./Icons";
import { Eyebrow, Reveal } from "./ui";

const FAQS = [
  {
    question: "Is the demo really free?",
    answer:
      "Yes. A working demo is built for your business first, and you pay only if you love it.",
  },
  {
    question: "How fast can my bot go live?",
    answer:
      "A standard chatbot goes live in about 2 to 3 days. You get a working demo first, so you can test everything before launch.",
  },
  {
    question: "Do I own the bot?",
    answer:
      "Always. Everything is built inside your own accounts. No lock-in and no hostage tricks — the bot is yours.",
  },
  {
    question: "Which apps can it answer on?",
    answer:
      "Instagram DMs, Facebook Messenger and Telegram. Business automation can also connect your other apps using Activepieces and Make.",
  },
  {
    question: "What happens if the bot cannot answer a question?",
    answer:
      "It captures the lead and notifies the owner, so a real person can take over and no customer is left waiting.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { requestDemo } = useDemoRequest();

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container-shell">
        <div className="faq-layout">
          <div className="faq-aside">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="section-title mt-5" id="faq-title">
                Questions,
                <br />
                <span className="serif-accent text-lime">answered.</span>
              </h2>
            </Reveal>
            <Reveal delay={130}>
              <p>
                The short version, without a sales script. Anything else, ask the builder
                directly.
              </p>
            </Reveal>
            <Reveal delay={190}>
              <a
                href="#contact"
                className="faq-dm-card"
                onClick={(event) => {
                  event.preventDefault();
                  requestDemo();
                }}
              >
                <span className="faq-dm-avatar">
                  <img
                    src="/images/robot.jpg"
                    alt=""
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span>
                  <strong>Still curious? DM the builder.</strong>
                  <span>No call centre. Just the person who builds it.</span>
                </span>
                <ArrowUpRight size={15} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="faq-list">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
                    <button
                      type="button"
                      className="faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span className="faq-num" aria-hidden="true">
                        0{index + 1}
                      </span>
                      <span className="faq-question">{faq.question}</span>
                      <span className="faq-icon" aria-hidden="true">
                        <Plus size={14} />
                      </span>
                    </button>
                    <div
                      className="faq-panel"
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      aria-hidden={!isOpen}
                    >
                      <div className="faq-panel-inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
