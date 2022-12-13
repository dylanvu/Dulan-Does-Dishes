import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Footer from '../components/common/footer'
import Navbar from '../components/common/navbar'

const theme = extendTheme({
  colors: {
    palette: {
      "blue": "#79B4B7",
      "white": "#FEFBF3",
      "cream": "#F8F0DF",
      "gray": "#9D9D9D"
    }
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component id="app" {...pageProps} />
      <Footer />
    </ChakraProvider>)
}

export default MyApp
