import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';

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
  const customTheme = extendTheme(theme);
  const getLayout = Component.getLayout ?? ((page) => <Layouts>{page}</Layouts>)

  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <title>{`${pageProps.pageTitle} - ${process.env.APP_NAME}`}</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}
