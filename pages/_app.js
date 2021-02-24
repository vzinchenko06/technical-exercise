import { AuthProvider } from '../lib/AuthContext';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider value={pageProps.authUser}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
