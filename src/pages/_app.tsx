import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import moment from "moment";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useState } from "react";
import "moment/locale/id";

import "../styles/globals.css";

import Layouts from "@/layouts";
import queryClient from "@/services/utils/query-client";
import theme from "@/services/utils/theme";

export type NextPageWithLayout<P = unknown, IP = unknown> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [customQueryClient] = useState(queryClient);
  const customTheme = extendTheme(theme);
  const getLayout =
    Component.getLayout ?? ((page) => <Layouts {...pageProps}>{page}</Layouts>);

  moment.locale("id-ID");

  return (
    <QueryClientProvider client={customQueryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={customTheme}>
          <Head>
            <title>{`${pageProps.pageTitle} - ${process.env.APP_NAME}`}</title>
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
