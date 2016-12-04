import React, { Component } from 'react';

function loadDataHoc(getWordFunc, getWordFuncField, getWordPromiseField) {

	return function (MyComponents) {

		class WordComponent extends Component {

			constructor(args) {
				super(...args);
				this.state = {
					translateArray: []
				}
			}

			callTranslationFunc = (data, word) => {
				getWordFunc(data).then((data, err) => {
					this.setState({
						translateArray: data,
						customerTranslate: word
					})
				})
			};

			render() {
				const componentProps = {
					[getWordFuncField]: this.callTranslationFunc,
					[getWordPromiseField]: this.state.translateArray,
					customerTranslate: this.state.customerTranslate
				};

				return (
					<MyComponents {...this.props} {...componentProps} />
				)
			}
		}

		return WordComponent;
	}

}

export default loadDataHoc;

/* когда кликаешь по кнопке - отправляется запрос и заново рендерится блок. поэтому через пропсы мы прокинем результат
до ValidatorHoc  а она уже добавив класс перерендерит Card с нужным классом */