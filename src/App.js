import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import {
	BrowserRouter as Router, Route, Switch, Link, Redirect,
} from 'react-router-dom';
import logo from './logo.svg';
import Landing from './pages/Landing';
import Pathfinding from './pages/Pathfinding';
import AppTitle from './components/AppTitle';
import Flex from './components/Flex';
import AppContainer from './components/AppContainer';
import AppHeader from './components/AppHeader';
import AppLogo from './components/AppLogo';

const GlobalStyle = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   font-family: sans-serif;
   background-color: black;
   color: white;
   min-width: 18.75em;
 }
`;

const App = () => {
	const [correctRedirect, setCorrectRedirect] = useState(false);

	useEffect(() => {
		setCorrectRedirect(true);
	}, []);

	return (
		<>
			<Router>
				<GlobalStyle />
				<AppContainer>
					<AppHeader>
						<AppLogo src={logo} alt="logo" />
						<AppTitle><Link style={{ textDecoration: 'none', color: 'white' }} href to="/">Pathfinding</Link></AppTitle>
					</AppHeader>
					<br />
					<Flex>
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route
								exact
								path="/pathfinding"
								render={() => (
									correctRedirect ? <Route exact path="/pathfinding" component={Pathfinding} /> : <Redirect exact to="/" />
								)}
							/>
							<Route exact path="/pathfinding" component={Pathfinding} />
						</Switch>
					</Flex>
					<br />
				</AppContainer>
			</Router>
		</>
	);
};

export default App;
