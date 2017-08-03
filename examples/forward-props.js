import React from 'react';
import 'react-primitives';
import glamorous from 'glamorous-primitives';

const MyComponent = ({shouldRender, ...rest}) => (
  shouldRender ? <glamorous.Text {...rest}>hello world</glamorous.Text> : null
)
const MyStyledComponent = glamorous(MyComponent, {
  forwardProps: ['shouldRender'],
  rootEl: 'View',
})(props => ({
  fontSize: props.big ? 36 : 24,
}))

let App = () => {
  return (
    <MyStyledComponent shouldRender={true} big={false} />
  )
}