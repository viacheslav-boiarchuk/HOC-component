import React, { Component } from 'react';
import createApiHoc from './hoc/createApiHoc';
import getWords from './services/words';
import Card from './components/card';
import logo from './logo.svg';
import './App.css';


class App extends Component {

	constructor(args) {
		super(...args);
		this.state = {
			counter: 0
		}
	}

	componentDidMount() {

		fetch('http://www.sportstats.com/basketball/usa/nba-2015-2016/results/')
			.then(data => data.json()).then(
			data => {
				console.log(data);
				return (data)
			},
			data => {
				throw new Error(data);
			}
		);

		this.props.loadWords();
	}

	setActiveSlide = (value) => () => {
		let tempCounter = this.state.counter || 0;
		switch(value) {
			case 'minus':
				if (tempCounter === 0) {
					tempCounter = 9
				}
				else {
					tempCounter--;
				}
				break;
			case 'plus':
				if (tempCounter === 9) {
					tempCounter = 0
				}
				else {
					tempCounter++;
				}
				break;
		}
		this.setState({counter: tempCounter});
	};

	render() {
		let {words} = this.props;
		let {counter} = this.state;
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>Welcome to React</h2>
				</div>
				<div className="carousel">
					<span className="arrow" onClick={this.setActiveSlide('minus')}> &lt; </span>
					<ul>
						{words.map((item, i) => (i === counter ? <Card classNextSlide="next" key={item.id} propsId={item.id} propsName={item.word}/> : <Card key={item.id} propsId={item.id} propsName={item.word}/>))}
					</ul>
					<span className="arrow" onClick={this.setActiveSlide('plus')}> &gt; </span>
				</div>
			</div>
		);
	}
}

const hoc = createApiHoc(getWords, 'loadWords', 'words');
export default hoc(App);

