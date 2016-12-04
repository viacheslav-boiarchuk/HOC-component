import React, { Component } from 'react';

function validatorHoc(outerValidationFunc){

	return function (MyComponent) {

		class ValidationWrapper extends Component {

			constructor(args) {
				super(...args);
				this.state = {
					defaultClass: ''
				}
			}

			componentWillReceiveProps(nextProps) {
				if (nextProps.translation.result === "ok") {
					let resultTranslation = outerValidationFunc(nextProps);
					this.setState({
						defaultClass: resultTranslation
					})
				}
			}

			render(){

				const classValueProps = {
					resultTranslation: this.state.defaultClass
				};

				return (
					<MyComponent {...classValueProps} {...this.props} />
				)
			}
		}

		return ValidationWrapper
	}

}

export default validatorHoc;