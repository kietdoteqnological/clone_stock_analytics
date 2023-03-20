import "@src/src/styles/globals.css";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { Urbanist } from "next/font/google";
import { store } from "@src/src/app/store";
import { AppPropsWithLayout } from "../interface/common";
import { EmptyLayout } from "../components/layout/empty";

const urbanist = Urbanist({ subsets: ["latin"] });
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <main className={urbanist.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </Provider>
  );
}

export default MyApp;
