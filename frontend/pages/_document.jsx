// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script
            src='https://kit.fontawesome.com/f9cf38b42f.js'
            crossOrigin='anonymous'
            async></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <iframe
            src='https://freedom.instatus.com/embed-status/dark-sm'
            width='245'
            height='61'
            frameBorder='0'
            scrolling='no'
            className='status'></iframe>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
