import React, { Component } from 'react';
import SingleDigitBox from './SingleDigitBox';
import Helpers from './Helpers';

class ScoreBox extends Component {
	displayDigitX = (number, place_val) => {
	let arr = ('' + number).split('');
	let index = Helpers.placeValueLookup(place_val);
	return arr[index];
	}

	displayDigit = (number, place_val) => {
	let arr = ('' + number).split('');
	let idx = 0;
	if (arr.length === 1) {
		if (place_val === 'ones') {
			idx = 0;
		} else {
			return '';
		}
	} else if (arr.length === 2) {
		if (place_val === 'ones') {
			idx = 1;
		} else if (place_val === 'tens') {
			idx = 0;
		} else {
			return '';
		}
	} else if (arr.length === 3) {
		if (place_val === 'ones') {
			idx = 2;
		} else if (place_val === 'tens') {
			idx = 1;
		} else if (place_val === 'hundreds') {
			idx = 0;
		}
	}
	return arr[idx];
   }

	render() {
		let { theme, score } = this.props;
		return (
			<section className={"integer-box integer-score " + theme}>
				<SingleDigitBox digit={this.displayDigit(score, 'hundreds')} digits="3"></SingleDigitBox>
				<SingleDigitBox digit={this.displayDigit(score, 'tens')} digits="3"></SingleDigitBox>
				<SingleDigitBox digit={this.displayDigit(score, 'ones')} digits="3"></SingleDigitBox>
			</section>
		)
	}
}

export default ScoreBox;