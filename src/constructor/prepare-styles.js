import { StyleSheet } from 'react-primitives';

export default function prepareStyles(styles) {
	return styles
		.filter(style => {
			if (typeof style === 'object') {
				return Object.keys(style).length > 0;
			}
			return true;
		})
		.map(style => {
			if (typeof style === 'object') {
				return StyleSheet.create({ style }).style;
			}
			return style;
		});
}
