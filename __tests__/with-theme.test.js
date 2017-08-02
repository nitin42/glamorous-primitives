import React, {Component} from 'react'
import {render, mount} from 'enzyme'
import glamorous from '../index'
import withTheme from '../src/figures/with-theme'
import ThemeProvider from '../src/figures/theme-provider'
import {CHANNEL} from '../src/constants'

const getMockedContext = unsubscribe => ({
  [CHANNEL]: {
    getState: () => {},
    setState: () => {},
    subscribe: () => unsubscribe,
  },
})

const mockComp = glamorous.text({})

test('renders a non-glamorous component with theme', () => {
  const CompWithTheme = withTheme(({theme: {padding}}) => (
    <glamorous.View style={{padding}} />
  ))
  expect(
    render(
      <ThemeProvider theme={{padding: '10px'}}>
        <CompWithTheme />
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

  const Child = withTheme(({theme: {padding}}) => <glamorous.View style={{padding}} />)
  const wrapper = mount(<Parent />)
  expect(wrapper).toMatchSnapshot(`with theme prop of padding 10px`)
  wrapper.setState({padding: 20})
  expect(wrapper).toMatchSnapshot(`with theme prop of padding 20px`)
})

test('works properly with classes', () => {
  /* eslint-disable react/prefer-stateless-function */
  class Child extends Component {
    render() {
      const {theme: {padding}} = this.props
      return <glamorous.View style={{padding}} />
    }
  }

  const ChildWithTheme = withTheme(Child)

  class Parent extends Component {
    state = {
      padding: 10,
    }

    render() {
      return (
        <ThemeProvider theme={{padding: this.state.padding}}>
          <ChildWithTheme />
        </ThemeProvider>
      )
    }
  }

  const wrapper = mount(<Parent />)
  expect(wrapper).toMatchSnapshot(`with theme prop of padding 10px`)
})

test('does not warn when NODE_ENV is set to `production`', () => {
  /* eslint-disable no-console */
  const originalWarn = console.warn
  console.warn = jest.fn()

  const originalEnv = process.env.NODE_ENV
  process.env.NODE_ENV = 'production'

  const Child = withTheme(() => <mockComp />)
  const Parent = () => <Child />
  mount(<Parent />)

  expect(console.warn).not.toHaveBeenCalled()

  console.warn = originalWarn
  process.env.NODE_ENV = originalEnv
})

test('unsubscribes from theme updates on unmount', () => {
  const Child = withTheme(() => <glamorous.View />)
  const unsubscribe = jest.fn()
  const context = getMockedContext(unsubscribe)
  const wrapper = mount(<ThemeProvider theme={{}}><Child /></ThemeProvider>, {
    context,
  })
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalled()
})

test('ignores context if a theme props is passed', () => {
  const unsubscribe = jest.fn()
  const context = getMockedContext(unsubscribe)
  const Comp = withTheme(() => <mockComp />)
  const wrapper = mount(<Comp theme={{}} />, {context})
  wrapper.unmount()
  expect(unsubscribe).toHaveBeenCalledTimes(1)
})