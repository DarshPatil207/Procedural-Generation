import { useEffect, useState } from "react";

const concepts = [
	{
		number: "01",
		title: "Rules over replicas",
		description: "Type in a random seed and let the system discover and build the rest.",
	},
	{
		number: "02",
		title: "Variation with intent",
		description: "Randomness becomes useful when it is shaped toward a specific experience.",
	},
	{
		number: "03",
		title: "Infinite, never identical",
		description: "A single seed can unfold into worlds that feel familiar, yet impossible to repeat.",
	},
];

// Add or replace values here to change the seeds used by the animation.
const seeds = ["10973442", "89237121", "97283718", "12345678", "87654321", "31415926", "27182818", "16180339", "14142135", "17320508"];

// Turn a seed into repeatable 2D positions so every generated map is unique but reproducible
function createWorld(seed) {
	let random = [...seed].reduce((total, character) => total + character.charCodeAt(0), 0);
	const nextRandom = () => {
		random = (random * 9301 + 49297) % 233280;
		return random / 233280;
	};
	return {
				// The delay values control the order: squares, circles, then triangles.
				trees: Array.from({ length: 11 }, (_, index) => ({ x: 78 + nextRandom() * 290, y: 65 + nextRandom() * 138, delay: index * 65 })),
				ponds: Array.from({ length: 3 }, (_, index) => ({ x: 95 + nextRandom() * 265, y: 76 + nextRandom() * 120, delay: 900 + index * 130 })),
				animals: Array.from({ length: 4 }, (_, index) => ({ x: 88 + nextRandom() * 285, y: 75 + nextRandom() * 125, delay: 1400 + index * 170 })),
	};
}

// Main component that renders the interactive 2D procedural world
function ProceduralVisualizer() {
	const [seedIndex, setSeedIndex] = useState(0);
	const [displayedSeed, setDisplayedSeed] = useState("");
	const [phase, setPhase] = useState("typing");
	const seed = seeds[seedIndex];
	const world = createWorld(seed);
	// Keep newly mounted worlds hidden until their own seed has finished typing
	const visualPhase = displayedSeed === seed ? phase : "typing";

	// Manage seed typing animation and phase transitions
	useEffect(() => {
		let timeout;
		let character = 0;

		// Run one complete seed cycle before moving to the next world
		const startCycle = () => {
			setDisplayedSeed("");
			setPhase("typing");
			typeSeed();
		};

		// Type seed text one character at a time
		const typeSeed = () => {
			if (character < seed.length) {
				character += 1;
				setDisplayedSeed(seed.slice(0, character));
				timeout = setTimeout(typeSeed, 170);
				return;
			}

			// After seed is fully typed, transition to generation phase
							// Increase 2200ms to keep the generating phase on screen longer.
							setPhase("generating");
			timeout = setTimeout(() => {
				setPhase("ready");
				timeout = setTimeout(() => setSeedIndex((current) => (current + 1) % seeds.length), 1800);
			}, 2200);
		};

		timeout = setTimeout(startCycle, 250);
		return () => clearTimeout(timeout);
	}, [seed]);

	return (
		<div className={`hero-art phase-${visualPhase}`} aria-label="Animation showing a seed generating a 2D world" role="img">
			<div className="art-header"><span><i /> GENERATOR / LIVE</span><span>RUN 0{seedIndex + 1}</span></div>
			<div className="seed-console"><span className="prompt">seed://</span><span>{displayedSeed}</span><span className="cursor" />{visualPhase === "ready" && <span className="status">locked</span>}</div>
			<div className="world-stage">
				<svg className="world-map" viewBox="0 0 460 250" aria-hidden="true">
					<defs><pattern id="world-grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#bfd1c2" strokeWidth="1" /></pattern></defs>
					<rect className="grid-background" x="28" y="18" width="404" height="214" rx="8" />
					<rect className="grid-lines" x="28" y="18" width="404" height="214" rx="8" />
					{world.trees.map((tree) => <rect className="map-square" key={`square-${tree.x}-${tree.y}`} x={tree.x - 6} y={tree.y - 6} width="12" height="12" rx="2" style={{ "--detail-delay": `${tree.delay}ms` }} />)}
					{world.ponds.map((pond) => <circle className="map-circle" key={`circle-${pond.x}-${pond.y}`} cx={pond.x} cy={pond.y} r="7" style={{ "--detail-delay": `${pond.delay}ms` }} />)}
					{world.animals.map((animal) => <path className="map-triangle" key={`triangle-${animal.x}-${animal.y}`} d={`M${animal.x} ${animal.y - 8}L${animal.x + 8} ${animal.y + 7}L${animal.x - 8} ${animal.y + 7}Z`} style={{ "--detail-delay": `${animal.delay}ms` }} />)}
				</svg>
			</div>
			<div className="generation-label"><span className="signal" />{visualPhase === "typing" ? "awaiting seed" : visualPhase === "generating" ? "building terrain..." : "world generated"}</div>
		</div>
	);
}

function Home() {
	return (
		<main className="site-shell">
			<nav className="topbar" aria-label="Main navigation">
				<a className="wordmark" href="#top" aria-label="Generative home">
					<span className="wordmark-mark" aria-hidden="true">✳</span>
					gen<span>erative</span>
				</a>
				<div className="nav-links">
					<a className="nav-active" href="/">Home</a>
					<a href="/impacts">Impacts</a>
					<a href="/solutions">Solutions</a>
				</div>
			</nav>

			<section className="hero" id="top">
				<div className="hero-copy">
					<p className="eyebrow"><span /> A field guide to making by rules - By Darsh Patil</p>
					<h1>Let the <em>system</em><br />surprise you.</h1>
					<p className="hero-intro">Procedural generation turns a handful of instructions, or a seed, into endless possibility. It is code as a collaborator: precise enough to guide, unpredictable enough to inspire.</p>
					<a className="primary-button" href="#definition">Start with the idea <span aria-hidden="true">↓</span></a>
				</div>
				<ProceduralVisualizer />
			</section>

			<section className="definition" id="definition">
				<p className="section-kicker">The short version</p>
				<div className="definition-content">
					<h2>So, what is <span>procedural generation?</span></h2>
					<p className="definition-copy">Procedural generation is the practice of creating content algorithmically rather than by hand. A designer defines the rules, inputs, and boundaries; a computer uses the seed to produce unique outcomes, from game landscapes and music to textures, stories, and entire galaxies. Some games that use procedural generation include Minecraft, Dwarf Fortress, and No Man's Sky.</p>
				</div>
			</section>

			<section className="principles" id="principles">
				<div className="section-heading"><p className="section-kicker">Three ideas to keep</p><h2>Small rules.<br />Big worlds.</h2></div>
				<div className="concept-list">
					{concepts.map((concept) => <article className="concept" key={concept.number}><span className="concept-number">{concept.number}</span><h3>{concept.title}</h3><p>{concept.description}</p></article>)}
				</div>
			</section>

			<section className="explore" id="explore"><div><p className="section-kicker">A final thought</p><h2>Build the rules.<br /><em>Find the world.</em></h2></div><p>Every generated thing is a conversation between control and chance. Change the seed, and the story starts again.</p></section>
			<footer className="footer"><span>generative/</span><span>Made from rules &amp; curiosity</span></footer>
			<p className="footer-note">Most of the text on this page was generated by the built-in AI agent, but was revised and somewhat rewritten by hand.</p>
		</main>
	);
}

export default Home;
