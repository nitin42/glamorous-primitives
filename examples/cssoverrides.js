import React from 'react';
import 'react-primitives';
import glamorous from 'glamorous-primitives';

class App extends React.Component {
	render() {
		return (
      <glamorous.View display="flex" justifyContent="center" alignItems="center">
        <glamorous.Text color="pink" fontSize="20px">Hello World</glamorous.Text>
      </glamorous.View>
		);
	}
}
