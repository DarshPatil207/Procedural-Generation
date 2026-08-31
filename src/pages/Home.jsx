import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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

const seeds = ["10973442", "89237121", "97283718", "12345678", "87654321", "31415926", "27182818", "16180339", "14142135", "17320508"];

// Creates individual world elements (trees, ponds, animals) positioned on the globe's surface
function addWorldDetail(parent, type, latitude, longitude, size) {
	// Convert latitude/longitude to 3D position on the sphere surface
	const radius = 1.37;
	const position = new THREE.Vector3(
		radius * Math.cos(latitude) * Math.cos(longitude),
		radius * Math.sin(latitude),
		radius * Math.cos(latitude) * Math.sin(longitude),
	);
	const detail = new THREE.Group();
	detail.position.copy(position);
	// Orient the object to face outward from the sphere center
	detail.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), position.clone().normalize());

	// Build different geometry based on detail type
	if (type === "tree") {
		const trunk = new THREE.Mesh(new THREE.CylinderGeometry(size * .12, size * .16, size * .7, 6), new THREE.MeshStandardMaterial({ color: 0x704f3e, roughness: 1 }));
		trunk.position.y = size * .35;
		const crown = new THREE.Mesh(new THREE.ConeGeometry(size * .55, size, 7), new THREE.MeshStandardMaterial({ color: 0x467456, roughness: .95 }));
		crown.position.y = size * .95;
		detail.add(trunk, crown);
	} else if (type === "pond") {
		const pond = new THREE.Mesh(new THREE.SphereGeometry(size, 16, 8), new THREE.MeshStandardMaterial({ color: 0x63a3a5, roughness: .25, metalness: .05 }));
		pond.scale.set(1.8, .08, 1.15);
		detail.add(pond);
	} else {
		const body = new THREE.Mesh(new THREE.SphereGeometry(size * .35, 8, 6), new THREE.MeshStandardMaterial({ color: 0xd7835b, roughness: .9 }));
		body.position.y = size * .3;
		body.scale.set(1.4, .8, .8);
		const head = new THREE.Mesh(new THREE.SphereGeometry(size * .24, 8, 6), body.material);
		head.position.set(size * .35, size * .45, 0);
		detail.add(body, head);
	}

	parent.add(detail);
}

// Main component that renders the interactive 3D procedural world
function ProceduralVisualizer() {
	const [seedIndex, setSeedIndex] = useState(0);
	const [displayedSeed, setDisplayedSeed] = useState("");
	const [phase, setPhase] = useState("typing");
	const canvasRef = useRef(null);
	const phaseRef = useRef(phase);
	const seed = seeds[seedIndex];

	useEffect(() => {
		phaseRef.current = phase;
	}, [phase]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
		const world = new THREE.Group();
		const details = new THREE.Group();
	// Convert seed string to a numeric value for seeding randomness
	const seedValue = [...seed].reduce((total, character) => total + character.charCodeAt(0), 0);
	// Handle canvas resize and maintain correct aspect ratio
		const resize = () => {
			const { width, height } = canvas.getBoundingClientRect();
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(width, height, false);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};

		camera.position.z = 4.6;
		scene.add(world);
		world.add(details);
		scene.add(new THREE.AmbientLight(0xb8d0be, 2.1));
		const keyLight = new THREE.DirectionalLight(0xffffff, 3.4);
		keyLight.position.set(-3, 4, 4);
		scene.add(keyLight);

		const globeGeometry = new THREE.SphereGeometry(1.35, 48, 32);
		const positions = globeGeometry.attributes.position;
		const colors = [];
		for (let index = 0; index < positions.count; index += 1) {
			const x = positions.getX(index);
			const y = positions.getY(index);
			const z = positions.getZ(index);
			// Generate procedural noise per vertex based on position and seed
		const noise = Math.sin(x * 5 + seedValue) * Math.cos(y * 6 - seedValue) + Math.sin(z * 8 + seedValue * 0.3);
		const elevation = noise / 3;
		// Color vertices based on elevation: blue for water, coral for mountains, green for land
		const color = elevation < -0.12 ? new THREE.Color("#548c91") : elevation > 0.22 ? new THREE.Color("#d7835b") : new THREE.Color("#6d9972");
			colors.push(color.r, color.g, color.b);
		}
		globeGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
		const globe = new THREE.Mesh(globeGeometry, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .9, flatShading: true }));
		world.add(globe);

		const outline = new THREE.LineSegments(new THREE.EdgesGeometry(globeGeometry, 35), new THREE.LineBasicMaterial({ color: 0xc2e0c5, transparent: true, opacity: .28 }));
		world.add(outline);
		// Add a subtle rotating accent halo around the globe
		const halo = new THREE.Mesh(new THREE.TorusGeometry(1.65, .012, 8, 96), new THREE.MeshBasicMaterial({ color: 0xe36f4f, transparent: true, opacity: .42 }));
		halo.rotation.x = Math.PI / 2.8;
		world.add(halo);

		// Create a seeded random number generator from the seed value
		let random = (seedValue % 997) / 997;
		const nextRandom = () => {
			random = (random * 9301 + 49297) % 233280;
			return random / 233280;
		};
		// Generate trees and ponds scattered across the globe surface
		for (let index = 0; index < 13; index += 1) {
			const latitude = -.18 + nextRandom() * 1.05;
			const longitude = nextRandom() * Math.PI * 2;
			addWorldDetail(details, index % 5 === 0 ? "pond" : "tree", latitude, longitude, .11 + nextRandom() * .04);
		}
		// Add a few animals scattered around the world
		for (let index = 0; index < 4; index += 1) {
			addWorldDetail(details, "animal", .05 + nextRandom() * .72, nextRandom() * Math.PI * 2, .1);
		}
		// Start details as invisible; they will fade in during generation
		details.scale.setScalar(0);

		resize();
		const observer = new ResizeObserver(resize);
		observer.observe(canvas);
		let previousTime = performance.now();
		let elapsed = 0;
		let frame;
		// Animation loop: rotate the globe and scale details in/out based on generation phase
		const animate = () => {
			const currentTime = performance.now();
			elapsed += (currentTime - previousTime) / 1000;
			previousTime = currentTime;
			// Rotate the world (unless user prefers reduced motion)
			if (!reduceMotion) {
				world.rotation.y = elapsed * .42;
				world.rotation.z = Math.sin(elapsed * .3) * .06;
			}
			// Scale globe slightly during generation phase for visual feedback
			const targetScale = phaseRef.current === "generating" ? 1.08 : 1;
			world.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), .025);
			// Fade in world details (trees, ponds, animals) after seed is complete
			const detailScale = phaseRef.current === "typing" ? 0 : 1;
			details.scale.lerp(new THREE.Vector3(detailScale, detailScale, detailScale), .035);
			renderer.render(scene, camera);
			frame = requestAnimationFrame(animate);
		};
		animate();

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			globeGeometry.dispose();
			globe.material.dispose();
			details.traverse((object) => {
				if (object.isMesh) {
					object.geometry.dispose();
					object.material.dispose();
				}
			});
			outline.geometry.dispose();
			outline.material.dispose();
			halo.geometry.dispose();
			halo.material.dispose();
			renderer.dispose();
		};
	}, [seed]);

	// Manage seed typing animation and phase transitions
	useEffect(() => {
		let timeout;
		let character = 0;

		// Type seed text one character at a time
		const typeSeed = () => {
			if (character < seed.length) {
				character += 1;
				setDisplayedSeed(seed.slice(0, character));
				timeout = setTimeout(typeSeed, 145);
				return;
			}

			// After seed is fully typed, transition to generation phase
			setPhase("generating");
			timeout = setTimeout(() => setPhase("ready"), 1900);
		};

		timeout = setTimeout(() => {
			setDisplayedSeed("");
			setPhase("typing");
			typeSeed();
		}, 380);
	return () => clearTimeout(timeout);
	}, [seed]);

	// Cycle through different seeds to show procedural variety
	// Cycle through different seeds to demonstrate procedural variety
	useEffect(() => {
		const loop = setTimeout(() => setSeedIndex((current) => (current + 1) % seeds.length), 7800);
		return () => clearTimeout(loop);
	}, [seedIndex]);

	return (
		<div className={`hero-art phase-${phase}`} aria-label="Animation showing a seed generating a 3D world" role="img">
			<div className="art-header"><span><i /> GENERATOR / LIVE</span><span>RUN 0{seedIndex + 1}</span></div>
			<div className="seed-console"><span className="prompt">seed://</span><span>{displayedSeed}</span><span className="cursor" />{phase === "ready" && <span className="status">locked</span>}</div>
			<div className="world-stage"><canvas ref={canvasRef} /></div>
			<div className="generation-label"><span className="signal" />{phase === "typing" ? "awaiting seed" : phase === "generating" ? "building terrain..." : "world generated"}</div>
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
					<a href="#definition">About</a>
					<a href="#principles">Principles</a>
					<a className="nav-cta" href="#explore">Explore <span aria-hidden="true">↗</span></a>
				</div>
			</nav>

			<section className="hero" id="top">
				<div className="hero-copy">
					<p className="eyebrow"><span /> A field guide to making by rules</p>
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
		</main>
	);
}

export default Home;
