// This array is the page's content model. Edit these values to change the cards
// without changing the JSX layout below.
const solutionCards = [
	{
		// The number and label appear in the card header.
		number: "01",
		label: "Possible Solutions",
		// The title and text appear in the card body.
		title: "Eight Solutions Ranked",
		text: <>1. Guaranteed Reward After a Certain Number of Tries (Pity System)<br />2. Playtesting With Diverse Players<br />3. Fairness Constraints (Minimum Guaranteed)<br />4. Post-Launch Data Analysis<br />5. Balancing Updates<br />6. Monitering System That Compensates For Extremely Bad Luck<br />7. Transparency About Randomness<br />8. Adding More Developers/Playtesters</>,
	},
	{
		number: "02",
		label: "Recommendation",
		title: "Why One? Use Multiple!",
		text: "A recommendation for society is to merge a few of the eight solutions together. The best ones would be the top 5 solutions.",
		// Only this card has priorities, so the list is rendered conditionally below.
		priorities: ["Guaranteed reward", "Diverse playtesting", "Fairness constraints", "Data analysis", "Balancing updates"],
	},
	{
		number: "03",
		label: "Effect of recommendation",
		title: "Team Effort",
		text: "With those five solutions, developers can attempt to make the game more fair, test it, release it, collect data, and fix issues over time. The reason only one solution won't work is because even though one single solution can fix one part of the problem, it will not fix the entire problem itself. For example, adding a pity system could save hours of non-stop playing, but won't solve how overpowered or strong an in-game item is. By mixing the top five, the developers will be able to fix many issues in the overall problem, not just a single part. This is important, as randomness can cause a fair deal or unfairness within a game.",
	},
];

function Solutions() {
	return (
		<main className="site-shell solutions-page">
			<nav className="topbar" aria-label="Main navigation">
				<a className="wordmark" href="#top" aria-label="Generative home">
					<span className="wordmark-mark" aria-hidden="true">✳</span>
					gen<span>erative</span>
				</a>
				{/* These links use the pathname checks in App.jsx. */}
				<div className="nav-links">
					<a href="/">Home</a>
					<a href="/impacts">Impacts</a>
					<a className="nav-active" href="/solutions">Solutions</a>
				</div>
			</nav>

			<section className="impact-hero solutions-hero" id="top">
				<div className="solutions-hero-image">
					<img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85" alt="A team collaborating around data and technology in an office" />
				</div>
				<div className="solutions-hero-copy">
					<p className="eyebrow"><span /> Practical solutions</p>
					<h1>Ethical concerns<br />need to be<em> considered.</em></h1>
					<p className="impact-intro">Every innovation has its ethical concerns. Procedural generation is no different, and it has quite a few ethical concerns. But, the most important one to consider is probably fairness. This is because many people play video games, and they expect to be treated fairly. Even a small error in the programming may unintentionally cause the game to favor a certain play style.</p>
				</div>
			</section>

			<section className="major-impact-grid solutions-card-grid" aria-label="Solutions overview">
				{/* One reusable template creates every card from the data above. */}
				{solutionCards.map((card) => (
					<article className="impact-card impact-card-major solution-card" key={card.number}>
						<div className="impact-card-header">
							<span className="impact-card-number">{card.number}</span>
							<span className="impact-card-tag">{card.label}</span>
						</div>
						<div className="impact-card-body">
							<h3>{card.title}</h3>
							<p>{card.text}</p>
							{/* If priorities are added to a card, show its numbered list. */}
							{card.priorities && (
								<ol className="solution-priority-list">
									{card.priorities.map((priority) => <li key={priority}>{priority}</li>)}
								</ol>
							)}
						</div>
					</article>
				))}
			</section>

			<section className="explore solutions-closing">
				<div><p className="section-kicker">The next iteration</p><h2>Start with one<br /><em>better solution.</em></h2></div>
				<p>Before adding more automation, ask what the system should make possible for people, places, and the future. Ask the system to improve what already exists.</p>
			</section>

			<footer className="footer"><span>GENERATIVE / SOLUTIONS</span><span>DESIGNING WITH CONSEQUENCE</span></footer>
		</main>
	);
}

export default Solutions;
