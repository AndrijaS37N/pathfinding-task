import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useWorker } from '@koale/useworker';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import Box from '../components/Box';
import Wrapper from '../components/Wrapper';
import LevelCounter from '../components/LevelCounter';
import GameOverMessage from '../components/GameOverMessage';
import bfsGridResult from '../workers/bfsWorker';
import LevelsData from './LevelsData';

const Pathfinding = () => {
	const rows = 10;
	const columns = 10;
	const destX = 7;
	const destY = 8;
	const destination = 78;

	const level = useRef(0);
	const location = useLocation();

	const [observableGridState, setObservableGridState] = useState();

	const [startLevel, setStartLevel] = useState(false);

	const [bfsRunner, setBfsRunner] = useState(false);

	const startButtonRef = useRef();

	const autoStartRef = useRef(location.state.useAutoStart);

	const [filledBlocks, setFilledBlocks] = useState([]);
	const [gameState, setGameState] = useState('stand-by' || 'running' || 'end');

	const bestPathLength = useRef();

	// A worker for BFS.
	const [comboWorker, { status: comboWorkerStatus, kill: killComboWorker }] = useWorker(bfsGridResult);
	const [resultPathState, setResultPathState] = useState();

	const levelsDataRef = useRef();

	const runWorker = async () => { // A run function for the BFS worker.
		const workerGrid = await comboWorker(level.current, rows, columns, destX, destY, destination);
		const observableFromWorkerGrid = (_workerGrid) => {
			const observable = [];
			let indexCounter = 0;
			for (let i = 0; i < _workerGrid.length; i += 1) {
				observable[i] = [];
				for (let j = 0; j < _workerGrid[i].length; j += 1) {
					if (_workerGrid[i][j] === 'block') {
						observable[i][j] = <Box id={`block${i}${j}`} backgroundColor="orange" name={`block${i}${j}`} key={`block${i}${j}-${i}`}>BLK</Box>;
					} else {
						observable[i][j] = <Box id={`b${indexCounter}`} backgroundColor="teal" name={indexCounter} key={indexCounter}>{indexCounter}</Box>;
					}
					indexCounter += 1;
				}
			}
			return observable;
		};

		setObservableGridState(observableFromWorkerGrid(workerGrid.grid));
		setResultPathState(workerGrid.res);
	};

	const drawRunning = (color, tiles, algoName, timer) => {
		if (tiles.length < 1) {
			switch (algoName) {
			case 'BFS':
				setBfsRunner(false);
				clearInterval(timer);
				break;
			case 'Dijkstra':
				//   setDijkstra(false); .....
				clearInterval(timer);
				break;
			case 'Star':
				// setStar(false); .....
				clearInterval(timer);
				break;
			default:
				break;
			}

			return;
		}
		const element = document.querySelector(`#${tiles.shift()}`);
		element.style.backgroundColor = color;
	};

	useEffect(() => {
		levelsDataRef.current = [];
		bestPathLength.current = destX + destY + 1;
		setResultPathState([]);
	}, []);

	useEffect(() => {
		if (!bfsRunner && gameState === 'running') { // ... !dijkstraRunner && !starRunner
			const blocksToChange = filledBlocks;

			for (let i = 0; i < blocksToChange.length; i += 1) {
				const filledElement = document.querySelector(`#${blocksToChange[i]}`);
				filledElement.style.backgroundColor = 'teal';
			}
			setFilledBlocks([]);
			setResultPathState([]);
			level.current += 1;

			levelsDataRef.current.push({ // Time and exploredBoxes can be received from the BFS worker.
				level: level.current,
				algorithmName: 'BFS',
				time: 0,
				exploredBoxes: [0],
			});

			setStartLevel(false);
			setGameState('stand-by');

			startButtonRef.current.disabled = false;
		}
	}, [bfsRunner, filledBlocks, gameState]);

	useEffect(() => {
		let timerBfs;
		if (bfsRunner === true) {
			if (level.current > 100 - bestPathLength.current) {
				setGameState('end');
				killComboWorker();
				autoStartRef.current = false;
				startButtonRef.current.disabled = true;
				return;
			}
			if (resultPathState.length < 1) {
				if (comboWorkerStatus !== 'RUNNING') {
					runWorker();
				}
			} else {
				const tiles = resultPathState.map(x => `b${x}`);
				setFilledBlocks(previousState => (
					previousState.concat(tiles)
				));
				timerBfs = setInterval(drawRunning, 100, 'blue', tiles, 'BFS', timerBfs);
			}
		}
		// eslint-disable-next-line consistent-return
		return () => {
			clearInterval(timerBfs);
			killComboWorker();
		};
		// eslint-disable-next-line
	}, [bfsRunner, resultPathState]);

	useEffect(() => {
		if (autoStartRef.current && gameState !== 'end') {
			setStartLevel(true);
		}

		if (startLevel === true && gameState !== 'end') {
			setGameState('running');
			const promiseBfsRunner = new Promise(() => {
				setBfsRunner(true);
			});

			Promise.all([promiseBfsRunner]).then(() => {
				// console.log('Promises finished.');
				// resolve();
			});
		}

		return () => {};
		// eslint-disable-next-line
	}, [startLevel]);

	return (
		<>
			<p>
				Grid
				{' '}
				<span aria-label="Grid Below" role="img">👇</span>
			</p>
			<LevelCounter>
				{level.current + 1}
				{' '}
				{comboWorkerStatus === 'RUNNING' ? <Spinner /> : null}
			</LevelCounter>
			{(level.current + 1) > 70 ? (
				<p style={{ fontSize: '1rem', marginLeft: '1rem', marginRight: '1rem' }}>
					Note: It is becoming harder and harder for the pathfinding algorithm to find a valid result.
				</p>
			)
				: null}
			<Wrapper>
				{observableGridState}
			</Wrapper>
			<br />
			<Button
				backgroundColor="teal"
				ref={startButtonRef}
				style={{ display: autoStartRef.current ? 'none' : 'initial' }}
				type="submit"
				onClick={() => {
					setStartLevel(true);
					startButtonRef.current.disabled = true;
				}}
			>
				{/* eslint-disable-next-line no-nested-ternary */}
				{gameState === 'end' ? 'Game Over' : startLevel ? 'Running...' : 'Start Level'}
			</Button>
			<br />
			{gameState === 'end' ? (
				<>
					<GameOverMessage>
						Go back to
						{' '}
						<Link style={{ color: 'white' }} to="/" href>home</Link>
						{' '}
						to start a
						{' '}
						<b>new</b>
						{' '}
						game!
					</GameOverMessage>
					<br />
					<LevelsData props={levelsDataRef.current} />
				</>
			) : null}
		</>
	);
};

export default Pathfinding;
