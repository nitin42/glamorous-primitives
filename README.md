## Glamorous primitives

> style primitive interfaces with glamorous

**Problem** 

You cannot use [glamorous](https://github.com/paypal/glamorous) together with [react-primitives](https://github.com/lelandrichardson/react-primitives) to style the components.

**Solution**

Combine glamorous with react-primitives to render the same code across the targets.

> Use this package **only** when you want to share the same code across multiple platform.

### Install

This module is distributed via [npm](npmjs.com) and should be installed as one of your project's dependencies:

```
npm install --save glamorous-primitives
```

This also depends on `react` and `react-primitives`.

### Caveats 

Right now glamorous doesn't have a native constructor (**WIP**) that can be used to style the components and render both on web and mobile, so there is subtle difference in import.

**For web**

```
import glamorous from 'glamorous-primitives/web'
```

**For mobile**

```
import glamorous from 'glamorous-primitives'
```


### Example 

```jsx
import { StyleSheet } from 'react-primitives'
import glamorous from 'glamorous-primitives'

const StyledView = glamorous.view({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '80px'
})

const StyledText = glamorous.text({
  color: 'red',
  backgroundColor: 'mistyrose',
  fontSize: '40px'
})

let Comp = () => {
  return (
    <StyledView>
      <StyledText>Hello World!!</StyledText>
    </StyledView>
  )
}

```

<p align="center">
<img src="https://i.gyazo.com/481fe38dcd6a3ebd63f80322a1034107.png" />
</p>


