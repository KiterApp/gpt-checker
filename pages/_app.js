import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { User } from 'lucide-react';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
    </UserProvider>
  );
}

export default MyApp;