import React from 'react';
import brcast from 'brcast';
import { CHANNEL } from '../constants';
import PropTypes from 'prop-types';

export default class ThemeProvider extends React.Component {
	static childContextTypes = {
		[CHANNEL]: PropTypes.object.isRequired,
	};

	static contextTypes = {
		[CHANNEL]: PropTypes.object,
	};

	static propTypes = {
		theme: PropTypes.object.isRequired,
		children: PropTypes.node,
	};

	getChildContext() {
		return {
			[CHANNEL]: this.broadcast,
		};
	}

	broadcast = brcast(this.props.theme);

	componentWillMount() {
		if (this.context[CHANNEL]) {
			this.setOuterTheme(this.context[CHANNEL].getState());
			this.broadcast.setState(this.getTheme());
		}
	}

	componentDidMount() {
		if (this.context[CHANNEL]) {
			this.unsubscribe = this.context[CHANNEL].subscribe(this.setOuterTheme);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.theme !== nextProps.theme) {
			this.broadcast.setState(this.getTheme(nextProps.theme));
		}
	}

	componentWillUnmount() {
		this.unsubscribe && this.unsubscribe();
	}

	getTheme(passedTheme) {
		const theme = passedTheme || this.props.theme;
		return { ...this.outerTheme, ...theme };
	}

	setOuterTheme = theme => {
		this.outerTheme = theme;
	}

	render() {
		return this.props.children ? React.Children.only(this.props.children) : null;
	}
}
