import React, { useEffect } from 'react';
import Accordion from '../components/Accordion';
import AccordionPanel from '../components/AccordionPanel';

// eslint-disable-next-line react/prop-types
const LevelsData = ({ props }) => {
	const list = props;
	useEffect(() => {
		const accs = document.getElementsByClassName('accordion');
		let i;

		for (i = 0; i < accs.length; i += 1) {
			// eslint-disable-next-line func-names
			accs[i].addEventListener('click', function () {
				// eslint-disable-next-line react/no-this-in-sfc
				this.classList.toggle('active');
				// eslint-disable-next-line react/no-this-in-sfc
				const panel = this.nextElementSibling;
				if (panel.style.display === 'block') {
					panel.style.display = 'none';
				} else {
					panel.style.display = 'block';
				}
			});
		}
	}, []);
	return (
		<>
			<div>
				Levels Data
				{' '}
				<span aria-label="Grid Below" role="img">👇</span>
				<br />
				<br />
				{list.map(x => (
					<div key={`level${x.level}`}>
						<Accordion className="accordion" key={`accordion${x.level}`}>
							Level
							{' '}
							{x.level}
						</Accordion>
						<AccordionPanel className="panel" key={`panel${x.level}`}>
							Algorithm name:
							{' '}
							{x.algorithmName}
							<br />
							Time:
							{' '}
							{x.time}
							<br />
							Explored boxes:
							{' '}
							{x.exploredBoxes}
						</AccordionPanel>
						{' '}

					</div>
				))}
			</div>
		</>
	);
};

export default LevelsData;
