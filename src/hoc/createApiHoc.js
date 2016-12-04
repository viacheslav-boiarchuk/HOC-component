import React, { Component } from 'react';

function createApiHoc(apiCall, functionName, result) {
	return function (MyComponent) {
		class CallComponent extends Component {
			constructor(args) {
				super(...args);
				this.state = {
					data: []
				}
			}
			load = () => {
				apiCall().then(data => {
						this.setState({
							data: data
						})
					}
				)
			};
			render() {
				const newProps = {
					[functionName]: this.load,
					[result]: this.state.data
				};

				return (
					<MyComponent {...this.props} {...newProps} />
				)
			}
		}
		return CallComponent;
	}
}

export default createApiHoc;

//apiCall - это getTranslation функция