import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Text from '../components/Text';
import CheckBox from '../components/CheckBox';
import Divider from '../components/Divider';
import ConfigBox from '../components/ConfigBox';

const Landing = () => {
	const [gameConfig, setGameConfig] = useState({});
	const autoStartCheckBox = useRef();
	const bfsCheckBox = useRef();
	const dijkstraCheckBox = useRef();
	const starCheckBox = useRef();

	useEffect(() => {
		setGameConfig({
			useBfs: true,
		});
		bfsCheckBox.current.checked = true;
	}, []);

	return (
		<>
			<Link href to={{ pathname: '/pathfinding', state: gameConfig }}>
				<Button
					border="2px dashed white"
					backgroundColor="teal"
					disabled={!(gameConfig.useBfs || gameConfig.useDijkstra || gameConfig.useStar)}
				>
					Play
				</Button>
			</Link>
			<Divider color="teal" />
			<ConfigBox>
				<Text>
					Game Configurations
					{' '}
					<span aria-label="Config Below" role="img">👇</span>
				</Text>
				<Text>
					Dijkstra&apos;s
					{' '}
					<CheckBox
						disabled
						ref={dijkstraCheckBox}
						onChange={() => {
							setGameConfig(previousState => ({
								...previousState,
								useDijkstra: dijkstraCheckBox.current.checked,
							}));
						}}
						type="checkbox"
					/>
				</Text>
				<Text>
					BFS
					{' '}
					<CheckBox
						ref={bfsCheckBox}
						onChange={() => {
							setGameConfig(previousState => ({
								...previousState,
								useBfs: bfsCheckBox.current.checked,
							}));
						}}
						type="checkbox"
					/>
				</Text>
				<Text>
					A Star
					{' '}
					<CheckBox
						disabled
						ref={starCheckBox}
						onChange={() => {
							setGameConfig(previousState => ({
								...previousState,
								useStar: starCheckBox.current.checked,
							}));
						}}
						type="checkbox"
					/>
				</Text>
				<Divider color="teal" />
				<Text>
					Automatic Runs
					{' '}
					<CheckBox
						ref={autoStartCheckBox}
						onChange={() => {
							setGameConfig(previousState => ({
								...previousState,
								useAutoStart: autoStartCheckBox.current.checked,
							}));
						}}
						type="checkbox"
					/>
				</Text>
			</ConfigBox>
		</>
	);
};

export default Landing;
