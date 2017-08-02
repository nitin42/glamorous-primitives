import shouldForwardProperty from '../utils/should-forward-property';

// This will change in V3 because it has support for css prop and other properties also!
export default function splitProps({ theme, innerRef, glam, ...rest }, { propsAreCssOverrides, rootEl, forwardProps }) {
	const styleOverrides = {};
	const returnValue = { toForward: {}, styleOverrides };

	if (!propsAreCssOverrides) {
		// It's a component, boom! Take everything 😎
		if (typeof rootEl !== 'string') {
			returnValue.toForward = rest;
			return returnValue;
		}
	}
	
	return Object.keys(rest).reduce((split, propName) => {
		if (forwardProps.indexOf(propName) !== -1 || shouldForwardProperty(rootEl, propName)) {
			split.toForward[propName] = rest[propName];
		} else if (propsAreCssOverrides) {
			split.styleOverrides[propName] = rest[propName];
		}
		return split;
	}, returnValue);
}
