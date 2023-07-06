import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${poppins.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
