import React from 'react';
import 'react-primitives';
import glamorous, { ThemeProvider } from 'glamorous-primitives';

const theme = {
	main: {
		color: 'green',
	},
	styledtheme: {
		color: 'pink',
	},
};

const Comp = glamorous.text(
	{
		height: 40,
	},
	(props, theme) => ({ color: theme.main.color })
);

class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Comp>Hello World</Comp>
			</ThemeProvider>
		);
	}
}
