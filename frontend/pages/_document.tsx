import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
   return (
      <Html lang='hu' style={{ scrollBehavior: 'smooth' }}>
         <Head />
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   )
}
