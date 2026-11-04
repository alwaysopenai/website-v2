import { Reveal } from "./ui";

const TOOLS = [
  { name: "ManyChat", mark: "MC" },
  { name: "Activepieces", mark: "AP" },
  { name: "Make", mark: "MK" },
  { name: "OpenAI", mark: "AI" },
  { name: "Telegram", mark: "TG" },
  { name: "Meta", mark: "MT" },
];

export function Tools() {
  return (
    <section className="tools-strip" aria-labelledby="tools-title">
      <div className="container-shell">
        <div className="tools-head">
          <h2 className="eyebrow" id="tools-title">
            <span className="eyebrow-dot" aria-hidden="true" />
            Tools &amp; channels we build with
          </h2>
          <span className="tools-note">Familiar tools. Your accounts. Your rules.</span>
        </div>
        <Reveal>
          <div className="tools-row">
            {TOOLS.map(({ name, mark }) => (
              <div className="tool-badge" key={name}>
                <span className="tool-mark" aria-hidden="true">
                  {mark}
                </span>
                {name}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
