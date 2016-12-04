import React, { Component } from 'react';
import getTranslates from '../services/translates';
import loadDataHoc from '../hoc/loadDataHoc';
import validatorHoc from '../hoc/validatorHoc';
import compare from '../services/compareWords';

class Card extends Component {

	constructor(args) {
		super(...args);
		this.state = {
			value: 'text'
		}
	}

	getTranslateRequest = (e) => {
		e.preventDefault();
		this.props.setTranslation(this.refs.cardName.innerText, this.state.value);
	};

	editValue = (e) => {
		this.setState({
			value: e.target.value
		})
	};

	render() {
		let {value} = this.state;
		let {propsId, propsName, resultTranslation} = this.props;
		let additionalClass = this.props.classNextSlide || "";
		return (
			<li key={propsId} className={"itemsList " + additionalClass + " " + resultTranslation }>
				<div className="card">
					<h3 ref="cardName">{propsName}</h3>
					<form>
						<input ref="cardTranslateValue" type="text" value={value} onChange={this.editValue}/>
						<button onClick={this.getTranslateRequest} type="submit">OK</button>
					</form>
				</div>
			</li>
		)
	}
}

const translationData = loadDataHoc(getTranslates, 'setTranslation', 'translation');

const validated = validatorHoc(
		(props) => {
			if (!props.translation) return 'basicClass';
			const isSame = compare(props.customerTranslate, props.translation);
			return isSame ? 'green' : 'red';
		}
);
export default translationData(validated(Card))