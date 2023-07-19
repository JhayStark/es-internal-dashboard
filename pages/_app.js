import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <main className={`${poppins.variable}`}>
      {router.pathname.includes('/auth') ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </main>
  );
}
