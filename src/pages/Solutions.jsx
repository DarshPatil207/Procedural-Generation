// Edit these objects to change the three solution cards without changing the layout.
const solutionCards = [
	{
		number: "01",
		title: "Set boundaries before you generate",
		text: "Define what the system is allowed to make, change, and reuse before the first prompt or seed is written.",
		outcome: "Clear creative direction",
	},
	{
		number: "02",
		title: "Keep people in the loop",
		text: "Use human review for meaningful decisions so generated content remains intentional, accountable, and legible.",
		outcome: "Better decisions",
	},
	{
		number: "03",
		title: "Measure the hidden cost",
		text: "Track energy, compute time, material use, and labor alongside output so efficiency is not the only definition of success.",
		outcome: "Responsible scale",
	},
];

// Each item is: number, heading, and supporting description.
const workflowSteps = [
	["01", "Frame", "Name the goal, audience, and limits."],
	["02", "Generate", "Let the system explore many possible paths."],
	["03", "Review", "Test the result against human and environmental needs."],
	["04", "Refine", "Keep what works and adjust the rules."],
];

function Solutions() {
	return (
		<main className="site-shell solutions-page">
			<nav className="topbar" aria-label="Main navigation">
				<a className="wordmark" href="#top" aria-label="Generative home">
					<span className="wordmark-mark" aria-hidden="true">✳</span>
					gen<span>erative</span>
				</a>
				<div className="nav-links">
					{/* These links use the pathname checks in App.jsx. */}
					<a href="/">Home</a>
					<a href="/impacts">Impacts</a>
					<a className="nav-active" href="/solutions">Solutions</a>
				</div>
			</nav>

			<section className="solutions-hero" id="top">
				<div>
					<p className="eyebrow"><span /> Practical solutions</p>
					<h1>Make room for<br /><em>better rules.</em></h1>
					<p className="hero-intro">Procedural generation is most useful when it expands human judgment instead of replacing it. These principles offer a way to build with more care at every stage.</p>
					<a className="primary-button" href="#approach">Explore the approach <span aria-hidden="true">↘</span></a>
				</div>
				<div className="solution-console" aria-label="Solution principles preview">
					<div className="solution-console-top"><span>FIELD NOTES / 04</span><span>READY TO APPLY</span></div>
					<div className="solution-orbit" aria-hidden="true">
						<span className="orbit-ring orbit-ring-one" /><span className="orbit-ring orbit-ring-two" />
						<span className="orbit-core">care<br /><b>+</b><br />control</span>
						<span className="orbit-node orbit-node-one">human</span><span className="orbit-node orbit-node-two">impact</span><span className="orbit-node orbit-node-three">scale</span>
					</div>
					<p className="solution-console-footer"><span className="signal" /> SYSTEMS ARE SHAPED BY THEIR CONSTRAINTS</p>
				</div>
			</section>

			<section className="solutions-approach" id="approach">
				<div className="section-heading"><p className="section-kicker">A considered approach</p><h2>Technology works<br />better with <span>intent.</span></h2></div>
				<div className="solution-card-grid">
					{solutionCards.map((card) => <article className="solution-card" key={card.number}>
						<div className="solution-card-top"><span>{card.number}</span><span className="solution-card-dot" /></div>
						<div><h3>{card.title}</h3><p>{card.text}</p></div>
						<strong>{card.outcome} <span aria-hidden="true">↗</span></strong>
					</article>)}
				</div>
			</section>

			<section className="workflow-section" id="workflow">
				<div className="workflow-intro"><p className="section-kicker">A repeatable loop</p><h2>Small checks.<br /><em>Stronger worlds.</em></h2><p>Build reflection into the process, not just the final result.</p></div>
				<div className="workflow-list">
					{workflowSteps.map(([number, title, text]) => <div className="workflow-step" key={number}><span className="workflow-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}
				</div>
			</section>

			<section className="solutions-start" id="start">
				<p className="section-kicker">The next iteration</p>
				<div><h2>Start with one<br /><span>better question.</span></h2><p>Before adding more automation, ask what the system should make possible for people, places, and the future.</p></div>
				<a className="primary-button" href="#top">Return to top <span aria-hidden="true">↑</span></a>
			</section>

			<footer className="footer"><span>GENERATIVE / SOLUTIONS</span><span>DESIGNING WITH CONSEQUENCE</span></footer>
		</main>
	);
}

export default Solutions;
