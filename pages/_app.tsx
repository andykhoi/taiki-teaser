import '../styles/globals.css'
import '../styles/index.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {

  return (
	  <>
	  	<Head>
			<title>Taiki Friends</title>
		</Head>
  		<Component {...pageProps} />
	  </>
  )
}

export default MyApp
