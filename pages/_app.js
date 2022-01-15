import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  
  return (
  <>
  <SessionProvider session={pageProps.session}>
    <Navbar></Navbar>
    <Component {...pageProps} />
    <Footer></Footer>
  </SessionProvider>
  </>
  )
}

export default MyApp


  
