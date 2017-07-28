import glamorous, { ThemeProvider, withTheme } from 'glamorous-native'
import assignAliases from './aliases'

// For React Native
export default assignAliases(glamorous)

export { ThemeProvider, withTheme }