import "@/styles/fonts.css";
import "@/styles/globals.css";

import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Layout } from "@/components/Layout/Layout";
import { store } from "@/app/store";

export default function App(appProps: AppProps) {
  return (
    <Provider store={store}>
      <Layout {...appProps} />
    </Provider>
  );
}
