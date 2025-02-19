import { AppProps } from "next/app";

export const Layout: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <main className="h-screen w-screen overflow-hidden">
      <Component {...pageProps} />
    </main>
  );
};
