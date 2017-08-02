import React from 'react'
import {render, mount} from 'enzyme'
import serializer from 'jest-glamor-react'
import 'react-primitives';
import renderer from 'react-test-renderer'
import reactPrimitives, {StyleSheet, View} from 'react-primitives'
import glamorous from '../src/index'

expect.addSnapshotSerializer(serializer)

describe('Primitive interfaces', () => {
  test('sanity test', () => {
    const Component = glamorous.view({margin: '10px'})

    const tree = renderer.create(
      <Component>Hello World</Component>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('should not throw any error when called glamorous.primitive()', () => {
    glamorous.view({})
  })

  test('should combine with StyleSheet.create() (inline styles)', () => {
    const Component = glamorous.view({
      margin: '10px',
      justifyContent: 'center',
      alignItems: 'center',
    })

    const styles = StyleSheet.create({
      foo: {
        backgroundColor: 'red',
        display: 'flex',
      },
    })

    const tree = renderer.create(
      <Component style={styles.foo} />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('should attach a displayName', () => {
    const ViewComponent = glamorous.view({})
    const ImageComponent = glamorous.image({})
    const TextComponent = glamorous.text({})
    const TouchableComponent = glamorous.touchable({})

    expect(ViewComponent.displayName).toBe('glamorous(View)')
    expect(ImageComponent.displayName).toBe('glamorous(Image)')
    expect(TextComponent.displayName).toBe('glamorous(Text)')
    expect(TouchableComponent.displayName).toBe('glamorous(Touchable)')
  })

  test('should pass the ref to the component', () => {
    const Component = glamorous.view({})
    const ref = jest.fn()

    const wrapper = mount(<Component innerRef={ref} />)
    const View = wrapper.find('View').first()

    expect(ref).toHaveBeenCalledWith(View.node)
  })

  test('should render a component with theme properties', () => {
    const Component = glamorous.text(
      {
        color: 'red',
      },
      (props, theme) => ({padding: theme.padding}),
    )
    expect(
      render(<Component theme={{padding: '10px'}} />),
    ).toMatchSnapshot()
  })

  test('should pass an updated theme when theme prop changes', () => {
    const Component = glamorous.text(
      {
        color: 'red',
      },
      (props, theme) => ({padding: theme.padding}),
    )
    const wrapper = mount(<Component theme={{padding: 10}} />)
    expect(wrapper).toMatchSnapshot(
      `with theme prop of padding 10px`,
    )
    wrapper.setProps({theme: {padding: 20}})
    expect(wrapper).toMatchSnapshot(
      `with theme prop of padding 20px`,
    )
  })

  test('should render the <Image /> component', () => {
    const ReactImage = glamorous.image({padding: '10px'})
    expect(
      <ReactImage source="https://facebook.github.io/react/img/logo_og.png" />,
    ).toMatchSnapshot()
  })

  test('combine inline styles with <Image /> component', () => {
    const styles = StyleSheet.create({
      image: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    })
    const ReactImage = glamorous.image({padding: '10px'})
    expect(
      <ReactImage
        style={styles.image}
        source="https://facebook.github.io/react/img/logo_og.png"
      />,
    ).toMatchSnapshot()
  })

  test('supports props as css properties', () => {
    const tree = renderer.create(
      <glamorous.Text color="pink">Hello World</glamorous.Text>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
