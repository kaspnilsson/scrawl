import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { GA_TRACKING_ID } from '../utils/gtag'

export default class MyDocument extends Document {
  render() {
    return (
      <Html className="w-full h-full scroll-smooth">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
            }}
          /> */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta
            name="theme-color"
            content="#0e0d0c"
            media="(prefers-color-scheme: dark)"
          />
          <meta
            name="theme-color"
            content="#f5f5f4"
            media="(prefers-color-scheme: light)"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
