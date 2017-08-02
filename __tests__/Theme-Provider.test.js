import React, {Component} from 'react'
import {render, mount} from 'enzyme'
import serializer from 'jest-glamor-react'
import glamorous from '../src/index'
import ThemeProvider from '../src/figures/theme-provider'
import {CHANNEL} from '../src/constants'

expect.addSnapshotSerializer(serializer)

const getMockedContext = unsubscribe => ({
  [CHANNEL]: {
    getState: () => {},
    setState: () => {},
    subscribe: () => unsubscribe,
  },
})

test('renders a component with theme', () => {
  const Comp = glamorous.view(
    {
      height: 40,
    },
    (props, theme) => ({padding: theme.padding}),
  )
  expect(
    render(
      <ThemeProvider theme={{padding: '10px'}}>
        <Comp />
      </ThemeProvider>,
    ),
  ).toMatchSnapshot()
})

test('theme properties updates get propagated down the tree', () => {
  class Parent extends Component {
    state = {
      padding: 10,
    }

    render() {
      return (
        <ThemeProvider theme={{padding: this.state.padding}}>
          <Child />
        </ThemeProvider>
      )
    }
  }
  const Child = glamorous.text(
    {
      color: 'red',
    },
    (props, theme) => ({padding: theme.padding}),
  )
  const wrapper = mount(<Parent />)
  expect(wrapper).toMatchSnapshot(`with theme prop of padding 10px`)
  wrapper.setState({padding: 20})
  expect(wrapper).toMatchSnapshot(`with theme prop of padding 20px`)
})

test('merges nested themes', () => {
  const One = glamorous.view({}, (props, {padding, margin}) => ({
    padding,
    margin,
  }))
  const Two = glamorous.view({}, (props, {padding, margin}) => ({
    padding,
    margin,
  }))
  expect(
    mount(
      <glamorous.View>
        <ThemeProvider theme={{padding: 1, margin: 1}}>
          <glamorous.View>
            <One />
            <ThemeProvider theme={{margin: 2}}>
              <Two />
            </ThemeProvider>
          </glamorous.View>
        </ThemeProvider>
      </glamorous.View>,
    ),
  ).toMatchSnapshot()
})

test('renders if children are null', () => {
  expect(
    mount(
      <ThemeProvider theme={{padding: 1}}>
        {false && <glamorous.View />}
      </ThemeProvider>,
    ),
  ).toMatchSnapshot()
})

test('cleans up outer theme subscription when unmounts', () => {
  const unsubscribe = jest.fn()
  const context = getMockedContext(unsubscribe)
  const wrapper = mount(<ThemeProvider theme={{}} />, {context})
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalled()
})

test('does nothing when receive same theme via props', () => {
  const theme = {margin: 2}
  const wrapper = mount(<ThemeProvider theme={theme} />)
  expect(wrapper).toMatchSnapshot(`with theme prop of margin 2px`)
  wrapper.setProps({theme})
  expect(wrapper).toMatchSnapshot(`with theme prop of margin 2px`)
})