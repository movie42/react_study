import Router from './routes/Router'
import GlobalStyle from './GlobalStyle'
import { ReactQueryDevtools } from 'react-query/devtools'
import { lightTheme, darkTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { useRecoilValue } from 'recoil'
import { isDarkAtom } from 'atoms'

function App() {
  const isDark = useRecoilValue(isDarkAtom)
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  )
}

export default App
