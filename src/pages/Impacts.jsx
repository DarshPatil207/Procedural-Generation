const majorImpactCards = [
  {
    number: "01",
    label: "Economic impact",
    title: "Efficiency scales faster than accountability.",
    text: "Procedural systems can reduce production costs and speed up iteration, but they also risk turning value into volume. When cost savings are prioritized over local labor, craft, and long-term maintenance, the system may become profitable while becoming less sustainable.",
    metric: "Cost efficiency",
  },
  {
    number: "02",
    label: "Cultural impact",
    title: "A repeating pattern can flatten a place’s identity.",
    text: "When outputs are generated from generalized rules, unique cultural memory can be replaced by familiar formulas. The result may feel polished and scalable, yet lose the local texture, contradictions, and human specificity that give a place its character.",
    metric: "Identity drift",
  },
];

const hypothesisCards = [
  {
    title: "Local labor gets displaced by automation",
    text: "As procedural tools become cheaper and faster, the value of slower, human-made production may be misunderstood as inefficient instead of culturally important.",
  },
  {
    title: "Markets reward sameness before originality",
    text: "A system optimized for reach may prefer repeatable results over distinctive ones, making novelty feel risky even when it is more meaningful.",
  },
  {
    title: "Communities lose authorship over place",
    text: "If the rules are set elsewhere, local people may become consumers of a generated identity rather than collaborators in shaping it.",
  },
  {
    title: "Scale creates dependency, not resilience",
    text: "Highly automated systems can expand quickly while becoming more fragile, especially when they depend on centralized infrastructure and narrow assumptions.",
  },
];

function Impacts() {
  return (
    <main className="site-shell impacts-page">
      <nav className="topbar" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Generative home">
          <span className="wordmark-mark" aria-hidden="true">✳</span>
          gen<span>erative</span>
        </a>
      </nav>

      <section className="impact-hero" id="top">
        <p className="eyebrow"><span /> The broader impact</p>
        <div className="impact-header">
          <h1>Rules can shape<br />more than just form.</h1>
          <p className="impact-intro">
            Procedural systems extend quickly across markets, cultures, and everyday life. Their benefits are real, but so are the risks when speed and scale are allowed to override context.
          </p>
        </div>
      </section>

      <section className="impact-grid major-impact-grid" aria-label="Major impact overview">
        {majorImpactCards.map((card, index) => (
          <article
            className="impact-card impact-card-major"
            key={card.label}
            style={{ "--delay": `${index * 180}ms` }}
          >
            <div className="impact-card-header">
              <span className="impact-card-number">{card.number}</span>
              <span className="impact-card-tag">{card.label}</span>
            </div>

            <div className="impact-card-body">
              <p className="impact-metric">{card.metric}</p>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="impact-hypotheses" aria-label="Hypotheses">
        <div className="hypothesis-header">
          <p className="section-kicker">My hypotheses</p>
          <h2>What may happen<br />when the system scales?</h2>
        </div>

        <div className="impact-grid hypothesis-grid">
          {hypothesisCards.map((card, index) => (
            <article
              className="impact-card impact-card-small"
              key={card.title}
              style={{ "--delay": `${index * 120}ms` }}
            >
              <div className="impact-card-header">
                <span className="impact-card-number">0{index + 1}</span>
                <span className="impact-card-tag">Hypothesis</span>
              </div>

              <div className="impact-card-body">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Impacts;
