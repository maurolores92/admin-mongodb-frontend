import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
