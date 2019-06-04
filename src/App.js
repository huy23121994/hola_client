import React, { Component } from 'react';
import './assets/css/main.scss';
import Main from './components/Main';

class App extends Component {
	render() {
		return (
			<div className="container pt-5">
				<Main />
			</div>
		);
	}
}

export default App;