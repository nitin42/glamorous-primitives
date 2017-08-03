import React from 'react';
import { StyleSheet } from 'react-primitives';
import glamorous, { ThemeProvider } from 'glamorous-primitives';

const StyledView = glamorous.view({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

const StyledText = glamorous.text({
  color: 'green',
  fontSize: '20px'
})

const styles = StyleSheet.create({
  foo: {
    backgroundColor: 'mistyrose'
  }
})

class App extends React.Component {
	render() {
		return (
      <StyledView>
        <StyledText style={styles.foo}>Hello World</StyledText>
      </StyledView>
		);
	}
}
