import shouldForwardProperty from '../src/utils/should-forward-property'

// Used for css overrides API
const validCssProps = ['color', 'height', 'width']

function pickRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

test('should forward a property with function as the tag', () => {
  expect(shouldForwardProperty(() => true, 'style')).toBeTruthy()
})