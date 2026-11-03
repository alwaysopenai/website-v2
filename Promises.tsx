import { Reveal, SectionIntro } from "./ui";

const PROMISES = [
  {
    number: "01",
    kicker: "The trust builder",
    title: "Free demo first.",
    copy: "We build a working demo for your business first. You pay only if you love it.",
    image: "/images/speech-bubbles.jpg",
    alt: "Two 3D chat bubbles with a glowing lightning bolt between them",
  },
  {
    number: "02",
    kicker: "The ownership promise",
    title: "You own everything.",
    copy: "Your bot is built inside your own accounts. No lock-in, no hostage tricks. It is yours.",
    image: "/images/shield-key.jpg",
    alt: "3D neon shield with a keyhole and a floating key",
  },
  {
    number: "03",
    kicker: "The human part",
    title: "You talk to the builder.",
    copy: "No call centres and no sales agents. You message the person who actually builds your bot.",
    image: "/images/robot.jpg",
    alt: "Friendly white 3D robot wearing a glowing headset and waving",
  },
  {
    number: "04",
    kicker: "The speed promise",
    title: "Fast delivery.",
    copy: "A standard chatbot goes live in about 2 to 3 days. You test the demo before launch.",
    image: "/images/calendar-rocket.jpg",
    alt: "3D calendar with a small lime rocket launching beside it",
  },
];

export function Promises() {
  return (
    <section className="section promises-section" id="why-us" aria-labelledby="why-title">
      <div className="container-shell">
        <SectionIntro
          eyebrow="Why AlwaysOpen AI"
          title={
            <span id="why-title">
              Four promises.
              <br />
              <span className="serif-accent text-amber">No small print.</span>
            </span>
          }
          copy="No invented reviews. No vanity numbers. Just the four things this studio is built on — and a live demo you can test before deciding anything."
        />

        <div className="promise-grid">
          {PROMISES.map((promise, index) => (
            <Reveal key={promise.number} delay={(index % 2) * 90}>
              <article className="promise-card h-full">
                <div className="promise-body">
                  <div>
                    <div className="promise-top">
                      <span className="promise-num">{promise.number}</span>
                      <span className="promise-kicker">{promise.kicker}</span>
                    </div>
                    <h3 className="promise-title">{promise.title}</h3>
                    <p className="promise-copy">{promise.copy}</p>
                  </div>
                  <span className="tag-dot">AlwaysOpen AI</span>
                </div>
                <div className="promise-art">
                  <img
                    src={promise.image}
                    alt={promise.alt}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
