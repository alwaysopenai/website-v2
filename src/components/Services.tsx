import { useDemoRequest } from "@/context/DemoRequest";
import { ArrowUpRight, Check, Wrench } from "./Icons";
import { Reveal, SectionIntro } from "./ui";

const SERVICES = [
  {
    number: "01",
    tag: "Always on your DMs",
    title: "Instagram and Messenger Chatbots",
    image: "/images/phone-chat.jpg",
    alt: "3D smartphone with glowing message bubbles rising from the screen",
    copy: "DMs answered in seconds, 24/7. The bot greets customers, answers common questions and captures leads — even at 2 AM.",
    items: ["Instant replies to every DM", "Common questions handled", "Leads captured and saved"],
  },
  {
    number: "02",
    tag: "Natural conversations",
    title: "Telegram Bots",
    image: "/images/paper-plane.jpg",
    alt: "3D paper plane soaring on a glowing neon trail",
    copy: "Smart bots for orders, support and updates. Conversations feel natural, not robotic — your customers can just talk.",
    items: ["Orders taken in chat", "Support and updates", "Natural, human-feeling flow"],
  },
  {
    number: "03",
    tag: "The quiet paperwork",
    title: "Business Automation",
    image: "/images/gears.jpg",
    alt: "3D interlocking gears with a glowing spark in the center",
    copy: "We connect your apps with Activepieces and Make: automatic replies, Google Sheets lead logging and follow ups.",
    items: ["Automatic replies", "Google Sheets lead logging", "Follow ups, handled"],
  },
];

export function Services() {
  const { requestDemo } = useDemoRequest();

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container-shell">
        <SectionIntro
          eyebrow="What we build"
          title={
            <span id="services-title">
              Three ways to stay <span className="serif-accent text-lime">open.</span>
            </span>
          }
          copy="Pick one, or let them work together. Every build starts with a free working demo, so you can see it before you decide."
        />

        <div className="service-grid">
          {SERVICES.map((service, index) => (
            <Reveal key={service.number} delay={index * 90}>
              <article className="lift-card h-full service-card">
                <div className="service-art art">
                  <img
                    src={service.image}
                    alt={service.alt}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="index-pill service-art-number">{service.number}</span>
                  <span className="service-art-tag">{service.tag}</span>
                </div>
                <div className="service-body">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-copy">{service.copy}</p>
                  <ul className="service-list">
                    {service.items.map((item) => (
                      <li key={item}>
                        <Check size={13} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="service-note">
            <p>
              <Wrench size={15} />
              Built inside your own accounts, with tools you can keep.
            </p>
            <a
              href="#contact"
              className="text-link"
              onClick={(event) => {
                event.preventDefault();
                requestDemo();
              }}
            >
              Start with a free demo
              <ArrowUpRight size={13} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
