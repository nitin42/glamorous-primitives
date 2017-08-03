import React from 'react';
import 'react-primitives';
import glamorous from 'glamorous-primitives';

const StyledText = glamorous.text({
  color: 'pink',
  fontSize: '20px'
})

const StyledView = StyledText.withComponent('Text')

class App extends React.Component {
	render() {
		return (
      <StyledView>Hello World</StyledView>
		);
	}
}
