// Organize the main impact cards into reusable heading and text sections.
const majorImpactCards = [
  {
    number: "01",
    label: "Economic impact",
    sections: [
      {
        heading: "AI Developers",
        text: <><b>Positive:</b> They will gain money because of the AI model.<br /><b>Negative:</b> There may be fewer human jobs available with AI doing most of the work.</>,
      },
      {
        heading: "Game Developers",
        text: <><b>Positive:</b> With AI that assists with procedural generation, game development becomes much easier.<br /><b>Negative:</b> They have to train the AI, and money is spent on trying to train the AI.</>,
      },
      {
        heading: "Playtesters",
        text: <><b>Positive:</b> They make money from playing games and providing feedback.<br /><b>Negative:</b> N/A</>,
      },
    ],
    metric: "Cost efficiency",
  },
  {
    number: "02",
    label: "Cultural impact",
    sections: [
      {
        heading: "AI Developers",
        text: <><b>Positive:</b> AI developers will feel triumphant with the success of their product.<br /><b>Negative:</b> There would be more work for the developers to update and maintain the AI.</>,
      },
      {
        heading: "Game Developers",
        text: <><b>Positive:</b> Their work will become much easier, as it will be AI assisted.<br /><b>Negative:</b> With AI doing a large portion of the work, there will be a lack of creative identity within workers.</>,
      },
      {
        heading: "Playtesters",
        text: <><b>Positive:</b> Playtesters will be able to collaborate with the developers.<br /><b>Negative:</b> There is a slight chance of overworking and repetitive testing.</>,
      },
    ],
    metric: "Identity drift",
  },
];

// Each hypothesis includes its own image so the visual matches the card topic.
const hypothesisCards = [
  {
    title: "Procedural generation could increase the amount of energy usage.",
    text: "Researchers estimate the the amount of electricity consumption used for procedural generation can produce around 50 million tons of C0₂.",
    image: {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
      alt: "Solar panels arranged across a landscape",
    },
  },
  {
    title: "Procedural generation could destroy habitats because of the need to mine for materials.",
    text: "Mining operations for metals needed to produce computerscan lead to habitat disruption, affecting biodiveristy and indigenous communities.",
    image: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      alt: "Close-up of a computer circuit board",
    },
  },
  {
    title: "Procedural generation could reduce the amount of physical waste such as paper and physical models.",
    text: "The usage of procedural generation caused a 60% reduction in the prototyping stage. The University of Southern California showed that using procedural generation reduced the waste of materials by 50%.",
    image: {
      src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=900&q=80",
      alt: "Sorted recyclable materials",
    },
  },
  {
    title: "Procedural generation could disrupt natural systems due to carbon and heat emissions from overheated computers. ",
    text: "Surface temperatures increased by an average of 3.6 degrees Fahrenheit after a data center started operations. In extreme cases, nearby temperatures increase by up to 16.4 degrees Fahrenheit.",
    image: {
      src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
      alt: "Sunlight passing through a green forest",
    },
  },
];

// Keep the labels in the same order as the hypothesis cards below.
const hypothesisTags = ["Energy systems", "Components", "Waste", "Energy systems"];

function Impacts() {
  return (
    <main className="site-shell impacts-page">
      <nav className="topbar" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Generative home">
          <span className="wordmark-mark" aria-hidden="true">✳</span>
          gen<span>erative</span>
        </a>
        {/* These links navigate to the paths handled in App.jsx. */}
        <div className="nav-links">
          <a href="/">Home</a>
          <a className="nav-active" href="/impacts">Impacts</a>
          <a href="/solutions">Solutions</a>
        </div>
      </nav>

      <section className="impact-hero" id="top">
        <p className="eyebrow"><span /> The broader impact</p>
        <div className="impact-header">
          <h1>Rules can shape<br />more than just form.</h1>
          <p className="impact-intro">
            Procedural generation uses rules and algorithms to create content at scale. This can create many opportunities in video game creation, but we also have to consider the economic and cultural impacts of this technology. Another factor to consider is how it affects the environmant around us.
          </p>
        </div>
      </section>

      <section className="impact-grid major-impact-grid" aria-label="Major impact overview">
        {/* Render each major impact from its data instead of repeating the card markup. */}
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
              {card.sections.map((section) => (
                <div className="impact-card-section" key={section.heading}>
                  <h3 className="impact-card-heading">{section.heading}</h3>
                  <p>{section.text}</p>
                </div>
              ))}
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
          {/* The third card receives a small layout adjustment for visual alignment. */}
          {hypothesisCards.map((card, index) => (
            <article
              className={`impact-card impact-card-small${index === 2 ? " impact-card-waste" : ""}`}
              key={card.title}
              style={{ "--delay": `${index * 120}ms` }}
            >
              <div className="impact-card-header">
                <span className="impact-card-number">0{index + 1}</span>
                <span className="impact-card-tag">{hypothesisTags[index]}</span>
              </div>

              <div className="impact-card-body">
                <img className="hypothesis-card-image" src={card.image.src} alt={card.image.alt} />
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
