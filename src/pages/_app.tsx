import "@src/src/styles/globals.css";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { Urbanist } from "next/font/google";
import { store } from "@src/src/app/store";
import { AppPropsWithLayout } from "../interface/common";
import { EmptyLayout } from "../components/layout/empty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";

const urbanist = Urbanist({ subsets: ["latin"] });
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <main className={urbanist.className}>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer autoClose={2000} />
          </Layout>
        </main>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
