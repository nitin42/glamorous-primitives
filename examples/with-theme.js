import React from 'react';
import 'react-primitives';
import glamorous, { ThemeProvider, withTheme } from 'glamorous';

// our main theme object
const theme = {
	main: { color: 'red' },
};

// a themed <Title> component
const Title = glamorous.text(
	{
		fontSize: '10px',
	},
	({ theme }) => ({
		color: theme.main.color,
	})
);

// normal component that takes a theme prop
const SubTitle = ({ children, theme: { color } }) =>
	<glamorous.Text style={{ color }}>
		{children}
	</glamorous.Text>;

// extended component with theme prop
const ThemedSubTitle = withTheme(SubTitle);

class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Title>Hello!</Title>
				<ThemedSubTitle>from withTheme!</ThemedSubTitle>
			</ThemeProvider>
		);
	}
}
