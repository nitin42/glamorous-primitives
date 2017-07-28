import glamorous, { ThemeProvider, withTheme } from 'glamorous'
import assignAliases from './aliases'

// For React
export default assignAliases(glamorous)

export { ThemeProvider, withTheme }