## Glamorous primitives 💄

> style primitive interfaces with glamorous

### Problem 

You cannot use [glamorous](https://github.com/paypal/glamorous) together with [react-primitives](https://github.com/lelandrichardson/react-primitives) to style the components.

### Solution

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
import React from 'react'
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

export default class App extends React.Component {
  render () {
    return (
      <StyledView>
        <StyledText>Hello World!!</StyledText>
      </StyledView>
    )
  }
}

```

**This is the exact same code rendering in the browser and as a mobile app 😎**

<p align="center">
<img src="./Primitives.png" />
</p>

**Also to Sketch (I haven't pushed the code for 👇🏼 in the repo, so you won't be able render to Sketch yet)**
<p align="center">
<img src="https://i.gyazo.com/902c9d20818cd7bac37fac5efcf1d202.gif" />
</p>
