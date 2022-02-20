import Router from './routes/Router'
import GlobalStyle from './GlobalStyle'
import { ReactQueryDevtools } from 'react-query/devtools'
import { lightTheme, darkTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'

function App() {
  const [isDark, setIsDark] = useState(false)
  const toggleDark = () => setIsDark((currnet) => !currnet)
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router isDark={isDark} toggleDark={toggleDark} />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  )
}

export default App
