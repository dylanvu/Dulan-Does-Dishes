import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Footer from '../components/common/footer'
import Navbar from '../components/common/navbar'
import { createContext, useEffect, useState, SetStateAction, Dispatch } from 'react'

const theme = extendTheme({
  colors: {
    palette: {
      "blue": "#79B4B7",
      "white": "#FEFBF3",
      "cream": "#F8F0DF",
      "gray": "#9D9D9D"
    }
  }
});

// create a jwt context
export const jwtContext = createContext<{ jwt: string | null, setJWT: Dispatch<SetStateAction<string | null>> | null } | null>(null);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // check to see if the user has a JWT
    const jwtLocal = localStorage.getItem("jwt");
    if (jwtLocal) {
      setJWT(jwtLocal)
    } else {
      setJWT(null);
    }
  }, []);

  const [jwt, setJWT] = useState<string | null>(null);
  return (
    <jwtContext.Provider value={{ jwt: jwt, setJWT: setJWT }} >
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component id="app" {...pageProps} />
        <Footer />
      </ChakraProvider>
    </jwtContext.Provider>
  )

}

export default MyApp
