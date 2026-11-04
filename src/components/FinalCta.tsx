import { useEffect, useState, type FormEvent } from "react";
import { useLenis } from "lenis/react";
import { useDemoRequest } from "@/context/DemoRequest";
import { DM_CHANNELS, Eyebrow, Reveal, type Channel } from "./ui";
import { ArrowUpRight, Check, Lock, Sparkle } from "./Icons";

type FormState = {
  name: string;
  email: string;
  phone: string;
  business: string;
  channel: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  business: "",
  channel: "Instagram",
  message: "",
};

export function FinalCta() {
  const { preferredChannel, setPreferredChannel } = useDemoRequest();
  const lenis = useLenis();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState>(EMPTY_FORM);

  useEffect(() => {
    setForm((current) => ({ ...current, channel: preferredChannel }));
  }, [preferredChannel]);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (field === "channel" && DM_CHANNELS.some((channel) => channel.id === value)) {
      setPreferredChannel(value as Channel);
    }
  };

  const focusForm = () => {
    const formNode = document.getElementById("contact-form");
    if (!formNode) return;
    if (lenis) {
      lenis.scrollTo(formNode, { offset: -100, duration: 0.9 });
    } else {
      formNode.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const chooseChannel = (channel: Channel) => {
    setPreferredChannel(channel);
    update("channel", channel);
    window.setTimeout(focusForm, 120);
  };

  const [submitError, setSubmitError] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Tell us your name";
    if (!form.email.trim() || !form.email.includes("@")) nextErrors.email = "Add a valid email so we can reply";
    if (!form.business.trim()) nextErrors.business = "What kind of business?";
    if (!form.channel.trim()) nextErrors.channel = "Pick one";
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setSubmitError("");
    try {
      const response = await fetch("https://formspree.io/f/xrpppgdd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _subject: "AlwaysOpen AI demo request" }),
      });
      if (!response.ok) throw new Error("Formspree rejected the request");
    } catch {
      setSubmitError("Could not send just now. Please email hello.alwaysopenai@gmail.com or DM us on Instagram @alwaysopen_ai instead.");
      return;
    }
    const saved = { ...form, savedAt: new Date().toISOString() };
    setSubmittedData(saved);
    setSubmitted(true);
    window.setTimeout(focusForm, 80);
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ ...EMPTY_FORM, channel: preferredChannel });
    setErrors({});
  };

  const firstName = submittedData.name.trim().split(/\s+/)[0] || "there";

  return (
    <section className="cta-section" id="contact" aria-labelledby="contact-title">
      <div className="container-shell">
        <Reveal>
          <div className="cta-panel">
            <div className="cta-grid">
              <div>
                <img
                  src="/images/neon-sign.jpg"
                  alt="Glowing green neon OPEN sign"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  className="cta-sign rounded-2xl border border-white/10 object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)]"
                />

                <Eyebrow>DM first. Demo first.</Eyebrow>
                <h2 className="cta-title mt-4" id="contact-title">
                  Your next customer is writing at{" "}
                  <span className="serif-accent">2 AM.</span>
                </h2>
                <p className="cta-copy">
                  Let&apos;s make sure they get an answer. Start with a free, working demo
                  built around your business — then decide.
                </p>

                <div className="dm-options" aria-label="Choose where to start the conversation">
                  {DM_CHANNELS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      className="dm-btn"
                      onClick={() => chooseChannel(id)}
                    >
                      <Icon size={14} />
                      {label}
                      <ArrowUpRight size={12} className="opacity-50" />
                    </button>
                  ))}
                </div>
                <p className="dm-note">
                  <Sparkle size={12} />
                  Choose a channel and add your details. The builder replies personally.
                </p>
                <p className="dm-note">
                  <Lock size={12} />
                  No prices published. No pressure. You own everything.
                </p>
              </div>

              <div className="form-card" id="contact-form">
                {submitted ? (
                  <div className="form-success" role="status" aria-live="polite">
                    <span className="success-mark">
                      <Check size={24} />
                    </span>
                    <h3>Your demo request is in.</h3>
                    <p>
                      Thanks, {firstName}. The next step is a free, working demo for{" "}
                      <strong className="font-medium text-cream/80">{submittedData.business}</strong>
                      , starting on {submittedData.channel}.
                    </p>
                    <a
                      href="#demo"
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        setSubmitted(false);
                      }}
                    >
                      Try the demo bot
                      <ArrowUpRight size={13} />
                    </a>
                    <button
                      type="button"
                      className="text-link mt-4 border-0 bg-transparent p-0"
                      onClick={reset}
                    >
                      Send another request
                    </button>
                    <small>We will reply to the email you gave, or DM you on the channel you picked.</small>
                  </div>
                ) : (
                  <>
                    <div className="form-head">
                      <h3 className="form-title">Request your free demo</h3>
                      <span className="form-badge">
                        <Check size={10} />
                        You pay only if you love it
                      </span>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-grid">
                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-name">
                            Name
                            {errors.name && <span className="form-error">{errors.name}</span>}
                          </label>
                          <input
                            id="contact-name"
                            className={`form-input${errors.name ? " has-error" : ""}`}
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(event) => update("name", event.target.value)}
                            aria-invalid={Boolean(errors.name)}
                          />
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-email">
                            Email
                            {errors.email && <span className="form-error">{errors.email}</span>}
                          </label>
                          <input
                            id="contact-email"
                            className={`form-input${errors.email ? " has-error" : ""}`}
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(event) => update("email", event.target.value)}
                            aria-invalid={Boolean(errors.email)}
                          />
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-phone">
                            Phone / WhatsApp <span className="normal-case tracking-normal text-mist/40">Optional</span>
                          </label>
                          <input
                            id="contact-phone"
                            className="form-input"
                            type="text"
                            name="phone"
                            autoComplete="tel"
                            placeholder="Optional"
                            value={form.phone}
                            onChange={(event) => update("phone", event.target.value)}
                          />
                        </div>

                        <div className="form-field">
                          <label className="form-label" htmlFor="contact-business">
                            Business type
                            {errors.business && (
                              <span className="form-error">{errors.business}</span>
                            )}
                          </label>
                          <input
                            id="contact-business"
                            className={`form-input${errors.business ? " has-error" : ""}`}
                            type="text"
                            name="business"
                            placeholder="Cafe, salon, clinic..."
                            value={form.business}
                            onChange={(event) => update("business", event.target.value)}
                            aria-invalid={Boolean(errors.business)}
                          />
                        </div>

                        <div className="form-field is-full">
                          <label className="form-label" htmlFor="contact-channel">
                            Where do your customers message you?
                          </label>
                          <select
                            id="contact-channel"
                            className="form-select"
                            name="channel"
                            value={form.channel}
                            onChange={(event) => update("channel", event.target.value)}
                          >
                            <option value="Instagram">Instagram</option>
                            <option value="Messenger">Messenger</option>
                            <option value="Telegram">Telegram</option>
                            <option value="More than one">More than one</option>
                          </select>
                        </div>

                        <div className="form-field is-full">
                          <label className="form-label" htmlFor="contact-message">
                            What should the bot handle first?
                            <span className="normal-case tracking-normal text-mist/40">
                              Optional
                            </span>
                          </label>
                          <textarea
                            id="contact-message"
                            className="form-textarea"
                            name="message"
                            placeholder="The questions you get every day, the orders, the follow ups..."
                            value={form.message}
                            onChange={(event) => update("message", event.target.value)}
                          />
                        </div>
                      </div>

{submitError && <p className="form-error">{submitError}</p>}
                      <button type="submit" className="btn btn-primary form-submit">
                        Get My Free Demo
                        <span className="btn-icon">
                          <ArrowUpRight size={15} />
                        </span>
                      </button>
                      <p className="form-foot">
                        <Lock size={11} />
                        A working demo comes first. You pay only if you love it.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
