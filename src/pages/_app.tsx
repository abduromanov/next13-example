import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';

import '../styles/globals.css'

import Layouts from '@/layouts';
import theme from '@/services/utils/theme'

export type NextPageWithLayout<P = unknown, IP = unknown> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 3600,
        refetchInterval: 3600,
        refetchOnWindowFocus: false,
      }
    }
  }));
  const customTheme = extendTheme(theme);
  const getLayout = Component.getLayout ?? ((page) => <Layouts>{page}</Layouts>)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={customTheme}>
          <Head>
            <title>{`${pageProps.pageTitle} - ${process.env.APP_NAME}`}</title>
          </Head>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
