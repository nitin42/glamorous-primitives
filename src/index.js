import createGlamorous from './constructor/create-glamorous'
import splitProps from './constructor/split-props'
import ThemeProvider from './figures/theme-provider'
import withTheme from './figures/with-theme'
import assignAliases from './utils/aliases'

const glamorous = createGlamorous(splitProps)

export default assignAliases(glamorous)

export {
  withTheme,
  ThemeProvider
}
