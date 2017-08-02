import React from 'react'
import {render} from 'enzyme'
import serializer from 'jest-glamor-react'
import glamorous from '../src/index'

expect.addSnapshotSerializer(serializer)

test('withComponent composes the component with provided styles', () => {
  const View = glamorous.view({fontSize: '20px'})
  const Text = View.withComponent('Text')
  expect(render(<Text />)).toMatchSnapshot()
})

test('withComponent creates a new component with the provided tag', () => {
  const Text = glamorous.text({color: 'red', fontSize: 20})
  const NewText = Text.withComponent('Text')
  expect(typeof Text.comp).toBe('function')
  expect(typeof NewText.comp).toBe('function')
})

test('forwardProps are applied to the new component', () => {
  const forwardProps = ['shouldRender']
  const Text = glamorous(
    ({shouldRender, ...props}) => (shouldRender ? <glamorous.Text {...props} /> : null),
    {forwardProps},
  )({color: 'red', fontSize: 20})
  const View = Text.withComponent('Text')
  expect(View.forwardProps).toEqual(forwardProps)
})

test('forwardProps can be overridden for the new component', () => {
  const Text = glamorous(
    ({shouldRender, ...props}) => (shouldRender ? <glamorous.Text {...props} /> : null),
    {forwardProps: ['shouldRender']},
  )({color: 'red', fontSize: 20})
  const forwardProps = ['other-thing']
  const View = Text.withComponent('Text', {forwardProps})
  expect(View.forwardProps).toEqual(forwardProps)
})

test('forwards options', () => {
  const Text = glamorous.text({color: 'red', fontSize: 20})
  const View = Text.withComponent('Text', {displayName: 'Text'})
  expect(View.displayName).toBe('Text')
})
