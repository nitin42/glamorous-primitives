import { Platform } from 'react-primitives';

// Execution environment (fallback for platform.os === 'ios' || platform.os === 'android')
import exenv from 'exenv';

const os = Platform.OS;

// __DEV__ is compiled into 'production' === process.env.NODE_ENV during build process (React Native)
function returnTheme(environment, theme) {
	return environment ? Object.freeze(theme) : theme;
}

function freeze(theme) {
	if (os === 'web') {
		const t = returnTheme(process.env.NODE_ENV !== 'production', theme);
		return t;
	}

	if ((os === 'ios' || os === 'android') && exenv.canUseDOM === false) {
		const t = returnTheme(__DEV__, theme);
		return t;
	}

	return theme;
}

function displayError(env, fn, component) {
	if (env) {
		console.warn(fn(component.displayName || component.name || 'Stateless Function'));
	}
	return;
}

function checkThemeWrapper(fn, component) {
	if (os === 'web') {
		displayError(process.env.NODE_ENV !== 'production', fn, component);
	}

	if ((os === 'ios' || os === 'android') && exenv.canUseDOM === false) {
		displayError(__DEV__, fn, component);
	}

	return;
}

export { checkThemeWrapper, freeze };
