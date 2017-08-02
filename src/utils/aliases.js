import reactPrimitives from 'react-primitives';

/**
  Native interfaces to be assigned. 
  https://code.facebook.com/posts/895897210527114/dive-into-react-native-performance/
 */

const aliases = ['Text', 'View', 'Image', 'Touchable'];

/**
  This function assigns the aliases to native glamorous constructor.
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
			const aliasLowerCase = alias.toLowerCase();
			getters[aliasLowerCase] = glamorousConstructor(reactPrimitives[alias]);
			return getters;
		}, {})
	);

	Object.assign(
		glamorousConstructor,
		aliases.reduce((comps, tag) => {
			comps[tag] = glamorousConstructor[tag.toLowerCase()]();
			comps[tag].displayName = `glamorous.${tag}`;
			comps[tag].propsAreCssOverrides = true;
			return comps;
		}, {})
	);

	return glamorousConstructor;
}

export default assignAliases;
