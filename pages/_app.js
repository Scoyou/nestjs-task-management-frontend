import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Navbar from '../components/navbar'
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";




Sentry.init({
  dsn: "https://5901c9213d824c98b155f3b7325019a1@o451084.ingest.sentry.io/5514930",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
});

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <Navbar />
    <Component {...pageProps} />
  </div>
  )
}

export default MyApp
