import createGlamorous from './constructor/create-glamorous';

function splitProps({ theme, innerRef, glam, ...rest }) {
	return { toForward: rest, styleOverrides: {} };
}

const glamorous = createGlamorous(splitProps);

export default glamorous;
