import { Button, Heading, Stack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

import { NextPageWithLayout } from "./_app";

export default function Custom500() {
  return (
    <Stack
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"6"}
    >
      <Head>
        <title>500 - {process.env.APP_NAME}</title>
      </Head>

      <Heading size={"4xl"}>500</Heading>
      <p>Halaman tidak ditemukan</p>

      <Link href={"/"}>
        <Button colorScheme="brand">Kembali ke Home</Button>
      </Link>
    </Stack>
  );
}

Custom500.getLayout = function getLayout(page: NextPageWithLayout) {
  return page;
};
