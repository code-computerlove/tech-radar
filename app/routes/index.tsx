import type { LinksFunction, LoaderFunction } from '@remix-run/server-runtime';
import type { Tech } from '@prisma/client';

import { useLoaderData } from '@remix-run/react';

import { getTechs } from '~/models/tech.server';

import { useEffect, useRef } from 'react';

import indexStyles from '~/styles/index.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: indexStyles }];
};

type TLoaderData = {
	techs: {
		[key: Tech['stage']]: Tech[];
	};
};

export const loader: LoaderFunction = async () => {
	const allTechs = await getTechs();
	const techs: TLoaderData['techs'] = {};
	allTechs.map(tech => {
		techs[tech.stage] = techs[tech.stage] || [];
		techs[tech.stage].push(tech);
		return true;
	});
	return {
		techs
	};
};

export default function Index() {
	const { techs } = useLoaderData<TLoaderData>();

	const el = useRef<HTMLDivElement>(null);
	const techEl = useRef<HTMLDivElement>(null);
	const containerEl = useRef<HTMLDivElement>(null);
	const holdEl = useRef<HTMLDivElement>(null);
	const trialEl = useRef<HTMLDivElement>(null);
	const assessEl = useRef<HTMLDivElement>(null);
	const adoptEl = useRef<HTMLDivElement>(null);

	let index = 1;

	const TechRadar = () => {
		if (!el.current) { return; };
		if (!techEl.current) { return; };
		
		const w = el.current.getBoundingClientRect().width;
		const h = w;
		const cx = w / 2;
		const cy = h / 2;

		const offset = techEl.current.getBoundingClientRect().width / 22;

		const holdMax = holdEl.current ? (holdEl.current.getBoundingClientRect().width / 2) - offset : 0;
		const assessMax = assessEl.current ? (assessEl.current.getBoundingClientRect().width / 2) - offset : 0;
		const trialMax = trialEl.current ? (trialEl.current.getBoundingClientRect().width / 2) - offset : 0;
		const adoptMax = adoptEl.current ? (adoptEl.current.getBoundingClientRect().width / 2) - offset : 0;
		const holdMin = assessMax + (offset * 2);
		const assessMin = trialMax + (offset * 2);
		const trialMin = adoptMax + (offset * 2);
		const adoptMin = offset * 2;

		function dot(el: HTMLElement | null, maxRadius: number, minRadius: number, minDegree: number, maxDegree: number) {
			if(!el) { 
				return;
			}
			const r = Math.random() * (maxRadius - minRadius) + minRadius;
			const d = Math.random() * (maxDegree - minDegree) + minDegree;
			const x = cx + r * Math.cos(2 * Math.PI * d);
			const y = cy + r * Math.sin(2 * Math.PI * d);
			el.style.left = `${x}px`;
			el.style.top = `${y}px`;
		}

		// TODO - map the techs onto the elements in the DOM and position them based
		// on their type and stage
		Object.entries(techs).map(([key, techs]) => techs.map(tech => {
			if (tech.stage === 'Adopt' && tech.type === 'Frameworks') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), adoptMin, adoptMax, .05, .2);
			}
			if (tech.stage === 'Trial' && tech.type === 'Frameworks') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), trialMin, trialMax, .05, .2);
			}
			if (tech.stage === 'Assess' && tech.type === 'Frameworks') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), assessMin, assessMax, .05, .2);
			}
			if (tech.stage === 'Hold' && tech.type === 'Frameworks') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), holdMin, holdMax, .05, .2);
			}

			if (tech.stage === 'Adopt' && tech.type === 'Tools') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), adoptMin, adoptMax, .8, .95);
			}
			if (tech.stage === 'Trial' && tech.type === 'Tools') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), trialMin, trialMax, .8, .95);
			}
			if (tech.stage === 'Assess' && tech.type === 'Tools') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), assessMin, assessMax, .8, .95);
			}
			if (tech.stage === 'Hold' && tech.type === 'Tools') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), holdMin, holdMax, .8, .95);
			}

			if (tech.stage === 'Adopt' && tech.type === 'Techniques') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), adoptMin, adoptMax, .55, .7);
			}
			if (tech.stage === 'Trial' && tech.type === 'Techniques') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), trialMin, trialMax, .55, .7);
			}
			if (tech.stage === 'Assess' && tech.type === 'Techniques') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), assessMin, assessMax, .55, .7);
			}
			if (tech.stage === 'Hold' && tech.type === 'Techniques') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), holdMin, holdMax, .55, .7);
			}

			if (tech.stage === 'Adopt' && tech.type === 'Platforms') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), adoptMin, adoptMax, .3, .45);
			}
			if (tech.stage === 'Trial' && tech.type === 'Platforms') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), trialMin, trialMax, .3, .45);
			}
			if (tech.stage === 'Assess' && tech.type === 'Platforms') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), assessMin, assessMax, .3, .45);
			}
			if (tech.stage === 'Hold' && tech.type === 'Platforms') {
				dot(document.getElementById(`${tech.stage}${tech.type}${tech.name}`), holdMin, holdMax, .3, .45);
			}

			return true;
		}));

		/* for (let i = 0; i < 50; i++) {
			dot(0, 50, 0, 0.25, 'red');
		}
		for (let i = 0; i < 50; i++) {
			dot(50, 80, 0.25, 0.5, 'green');
		}
		for (let i = 0; i < 50; i++) {
			dot(80, 120, 0.5, 0.75, 'blue');
		}
		for (let i = 0; i < 50; i++) {
			dot(120, 150, 0.75, 1, 'orange');
		} */
		/*
		const Core = {
			itemArr: document.querySelectorAll('.tech-block') as NodeListOf<HTMLElement> || [],
			item: undefined,
			init: function () {
				this.setItems();
			},

			getItemSquare: function () {
				return techEl.current ? techEl.current.getBoundingClientRect().width : 30;
			},

			getValues: function () {
				const itemWidth = this.getItemSquare();

				const holdTechniquesMax = (holdEl.current ? holdEl.current.getBoundingClientRect().width : 2) / 2 - itemWidth;
				const assessTechniquesMax = (assessEl.current ? assessEl.current.getBoundingClientRect().width : 2) / 2 - itemWidth;
				const trialTechniquesMax = (trialEl.current ? trialEl.current.getBoundingClientRect().width : 2) / 2 - itemWidth;
				const holdTechniquesMin = assessTechniquesMax + (itemWidth * 2);
				const adoptTechniquesMax = (adoptEl.current ? adoptEl.current.getBoundingClientRect().width : 2) / 2 - itemWidth;
				const assessTechniquesMin = trialTechniquesMax + (itemWidth * 2);
				const trialTechniquesMin = adoptTechniquesMax + (itemWidth * 2);
				const adoptTechniquesMin = 0;

				return {
					holdTechniquesMax,
					holdTechniquesMin,
					assessTechniquesMax,
					assessTechniquesMin,
					trialTechniquesMax,
					trialTechniquesMin,
					adoptTechniquesMax,
					adoptTechniquesMin,
				};
			},

			setItems: function () {
				this.radius();
			},

			updateItem: function (el: HTMLElement, x: number, y: number) {
				el.style.left = `${x}px`;
				el.style.top = `${y}px`;
			},

			getItemLength: function () {
				return this.itemArr.length;
			},

			getRadiusRange: function (max: number, min: number) {
				return Math.random() * (max - min) + min;
			},

			radius: function () {
				const radar = this.getValues();
				const centerX = (el.current ? el.current.getBoundingClientRect().width : 2) / 2;
				const centerY = centerX;

				const holdItems = Array.from(this.itemArr).filter(item => item.dataset?.stage?.toLowerCase() === 'hold');
				const assessItems = Array.from(this.itemArr).filter(item => item.dataset?.stage?.toLowerCase() === 'assess');
				const trialItems = Array.from(this.itemArr).filter(item => item.dataset?.stage?.toLowerCase() === 'trial');
				const adoptItems = Array.from(this.itemArr).filter(item => item.dataset?.stage?.toLowerCase() === 'adopt');

				this.placeItems('hold', holdItems, radar, centerX, centerY);
				this.placeItems('assess', assessItems, radar, centerX, centerY);
				this.placeItems('trial', trialItems, radar, centerX, centerY);
				this.placeItems('adopt', adoptItems, radar, centerX, centerY);
			},

			placeItems: function (type: string, items: HTMLElement[], radar: { [key: string]: number;}, centerX: number, centerY: number) {
				for (let i = 0; i < items.length; i++) {
					const radius = this.getRadiusRange(
						radar[`${type}TechniquesMax`],
						radar[`${type}TechniquesMin`]
					);
					const angleStep = (Math.PI * 2) / items.length / 4;

					// const theta = (2 * Math.PI * i) / itemsLength;
					const theta = i * angleStep;

					this.updateItem(items[i], centerX + Math.cos(theta) * radius, centerY + Math.sin(theta) * radius);
				}
			}
		};

		Core.init();
		*/
	};

	useEffect(() => {
		TechRadar();
	});
	return (
		<main id="main">
			<div className="container" ref={containerEl}>
				<h1>Code Tech Radar</h1>

				<div className="tech-container">
					<div className="tech-list" style={style}>
						{Object.entries(techs).map(([key, techs]) => <div className="tech" key={key}>
							<h2>{key}</h2>
							<ol key={key} start={index}>
								{techs.map(tech => {
									index++;
									return <li key={tech.id}>{tech.name} - {tech.type}</li>
								})}
							</ol>
						</div>)}
					</div>

					<div className="tech-radar" ref={el}>
						<ul className="quadrants">
							<li>
								<h2>Techniques</h2>
							</li>
							<li>
								<h2>Tools</h2>
							</li>
							<li>
								<h2>Platforms</h2>
							</li>
							<li>
								<h2>Languages &amp; Frameworks</h2>
							</li>
						</ul>
						<div className="hold" ref={holdEl}>
							<h3>Hold</h3>
							<div className="assess" ref={assessEl}>
								<h3>Assess</h3>
								<div className="trial" ref={trialEl}>
									<h3>Trial</h3>
									<div className="adopt" ref={adoptEl}>
										<h3>Adopt</h3>
									</div>
								</div>
							</div>
						</div>
						{Object.entries(techs).map(([key, techs]) => techs.map((tech, techIndex) => techIndex === 0 ? <div ref={techEl} id={`${tech.stage}${tech.type}${tech.name}`} className="tech-block" data-tech-item data-type={tech.type} data-stage={tech.stage} style={{ left: '0', top: '0' }} key={`tech-item-${tech.id}`}>
							<span>
								{tech.index}
								<em>{tech.name}</em>
							</span>
						</div> : <div id={`${tech.stage}${tech.type}${tech.name}`} className="tech-block" data-tech-item data-type={tech.type} data-stage={tech.stage} style={{ left: '0', top: '0' }} key={`tech-item-${tech.id}`}>
							<span>
								{tech.index}
								<em>{tech.name}</em>
							</span>
						</div>))}
					</div>
				</div>
			</div>
		</main>
	);
}
