import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import "@/styles/globals.css";
import SocketProvider from "@/context/SocketProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${GeistSans.className} bg-slate-900 text-slate-200`}>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </main>
  );
};

export default MyApp;
