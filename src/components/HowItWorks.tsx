import { useDemoRequest } from "@/context/DemoRequest";
import { ArrowUpRight, Bolt, Chat, CheckBadge, Rocket, Wrench } from "./Icons";
import { Reveal, SectionIntro } from "./ui";

const STEPS = [
  {
    number: "01",
    title: "Say hello on DM",
    copy: "Tell the builder what your business does and where your customers message you.",
    Icon: Chat,
  },
  {
    number: "02",
    title: "We build your free demo",
    copy: "A working bot shaped around your services, your questions and your tone.",
    Icon: Wrench,
  },
  {
    number: "03",
    title: "You test it and approve",
    copy: "Try the real conversation. Change what you want. It only goes live when you are happy.",
    Icon: CheckBadge,
  },
  {
    number: "04",
    title: "Live in 2 to 3 days",
    copy: "We connect it inside your accounts, and your business stays open from then on.",
    Icon: Rocket,
  },
];

export function HowItWorks() {
  const { requestDemo } = useDemoRequest();

  return (
    <section className="section" id="how-it-works" aria-labelledby="how-title">
      <div className="container-shell">
        <SectionIntro
          eyebrow="How it works"
          title={
            <span id="how-title">
              From hello to{" "}
              <span className="serif-accent text-lime">always open.</span>
            </span>
          }
          copy="Four small steps. No sales calls, no long onboarding, no lock-in. Just a conversation and a working demo."
        />

        <div className="steps-grid">
          <div className="steps-line" aria-hidden="true" />
          {STEPS.map(({ number, title, copy, Icon }, index) => (
            <Reveal key={number} delay={index * 80}>
              <article className="step">
                <div className="step-icon">
                  <Icon size={21} />
                </div>
                <div className="step-num">Step {number}</div>
                <h3 className="step-title">{title}</h3>
                <p className="step-copy">{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="steps-foot">
            <Bolt size={14} />
            <span>A standard chatbot goes live in about 2 to 3 days.</span>
            <a
              href="#contact"
              className="text-link ml-auto"
              onClick={(event) => {
                event.preventDefault();
                requestDemo();
              }}
            >
              Start with your free demo
              <ArrowUpRight size={13} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
