import React, { Component } from 'react';
import reactPrimitives from 'react-primitives';
import PropTypes from 'prop-types';
import { CHANNEL } from '../constants';
import getStyles from '../utils/get-styles';
import prepareStyles from './prepare-styles';
import { freeze } from '../injector/platform';

export default function createGlamorous(splitProps) {
	return function glamorous(comp, { propsAreCssOverrides, rootEl, displayName, forwardProps = [] } = {}) {
		return glamorousComponentFactory;

		function glamorousComponentFactory(...unpreparedStyles) {
			// Prepare styles for Native View and Web View
			const styles = prepareStyles(unpreparedStyles);

			class GlamorousComponent extends Component {
				state = { theme: null };
				setTheme = theme => this.setState({ theme });

				// Not in sync with glamorous beta V4 (theme is already available on props)
				constructor(props, context) {
					super(props, context);
					// (yet to be unbinded)
					this.onRef = this.onRef.bind(this);
				}

				componentWillMount() {
					const { theme } = this.props;

					if (this.context[CHANNEL]) {
						this.setTheme(theme ? theme : this.context[CHANNEL].getState());
					} else {
						this.setTheme(theme || {});
					}
				}

				componentWillReceiveProps(nextProps) {
					if (this.props.theme !== nextProps.theme) {
						this.setTheme(nextProps.theme);
					}
				}

				componentDidMount() {
					if (this.context[CHANNEL] && !this.props.theme) {
						this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme);
					}
				}

				componentWillUnmount() {
					this.unsubscribe && this.unsubscribe();
				}

				// (yet to be unbinded)
				onRef(innerComponent) {
					this.innerComponent = innerComponent;
					if (this.props.innerRef) {
						this.props.innerRef(innerComponent);
					}
				}

				setNativeProps(nativeProps) {
					if (this.innerComponent) {
						this.innerComponent.setNativeProps(nativeProps);
					}
				}

				render() {
					const props = this.props;

					const { toForward, styleOverrides } = splitProps(props, GlamorousComponent);

					const theme = freeze(this.state.theme);

					const fullStyles = getStyles(GlamorousComponent.styles, props, styleOverrides, theme, this.context);

					return React.createElement(GlamorousComponent.comp, {
						...toForward,
						ref: this.onRef,
						style: fullStyles.length > 0 ? fullStyles : null,
					});
				}
			}

			GlamorousComponent.comp = comp;

			GlamorousComponent.propTypes = {
				innerRef: PropTypes.func,
				theme: PropTypes.object,
			};

			const defaultContextTypes = {
				[CHANNEL]: PropTypes.object,
			};

			let userDefinedContextTypes = null;

			// Also retain the glamorous contexy channel
			Object.defineProperty(GlamorousComponent, 'contextTypes', {
				enumerable: true,
				configurable: true,
				set(value) {
					userDefinedContextTypes = value;
				},
				get() {
					if (userDefinedContextTypes) {
						return {
							...defaultContextTypes,
							...userDefinedContextTypes,
						};
					}
					return defaultContextTypes;
				},
			});

			function withComponent(newComp, options = {}) {
				return glamorous(reactPrimitives[newComp], {
					forwardProps: GlamorousComponent.forwardProps,
					...options,
				})(...GlamorousComponent.styles);
			}

			Object.assign(
				GlamorousComponent,
				getGlamorousComponentMetadata({
					comp,
					styles,
					rootEl,
					forwardProps,
					displayName,
				}),
				{ withComponent, isGlamorousComponent: true }
			);

			return GlamorousComponent;
		}
	};
}

function getGlamorousComponentMetadata({ comp, styles, rootEl, forwardProps, displayName }) {
	const componentsComp = comp.comp ? comp.comp : comp;

	return {
		styles: when(comp.styles, styles),
		comp: componentsComp,
		rootEl: rootEl || componentsComp,
		forwardProps: when(comp.forwardProps, forwardProps),
		displayName: displayName || `glamorous(${getDisplayName(comp)})`,
	};
}

function when(comp, prop) {
	return comp ? comp.concat(prop) : prop;
}

function getDisplayName(comp) {
	return typeof comp === 'string' ? comp : comp.displayName || comp.name || 'unknown';
}
