import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Navbar from '../components/navbar'

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <Navbar />
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp
