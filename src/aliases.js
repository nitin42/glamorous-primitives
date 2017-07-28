import reactPrimitives from 'react-primitives'

/**
  Lazy require the React Native modules - https://code.facebook.com/posts/895897210527114/dive-into-react-native-performance/
 */ 
const aliases = ['Text', 'View', 'Image', 'Touchable']

/**
  This will assign the aliases to glamorous constructor (both on web and mobile, temporary workaround but it works perfectly!)
  Example - 
  const StyledText = glamorous.text({ color: 'red' })
  
  <StyledText>
    Hello World
  </StyledText>

**/
function assignAliases(glamorousConstructor) {
  Object.assign(
    glamorousConstructor,
    aliases.reduce((getters, alias) => {
      const aliasLowerCase = alias.toLowerCase()
      getters[aliasLowerCase] = glamorousConstructor(reactPrimitives[alias])
      return getters;
    }, {})
  );
  return glamorousConstructor
}

export default assignAliases
