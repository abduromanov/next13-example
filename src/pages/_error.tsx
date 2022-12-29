import { Heading, Stack } from "@chakra-ui/react";
import { NextPageContext } from "next";

import { NextPageWithLayout } from "./_app";

type Props = {
  statusCode?: number
}

function Error({ statusCode }: Props) {
  return (
    <Stack h={'100vh'} alignItems={'center'} justifyContent={'center'} spacing={'6'}>
      <Heading size={'4xl'}>{statusCode}</Heading>
      <p>
        {!statusCode
          ? 'An error occurred on client'
          : statusCode === 404
            ? 'Page Not Found'
            : `An error ${statusCode} occurred on server`
        }
      </p>
    </Stack>
  );
};

Error.getLayout = function getLayout(page: NextPageWithLayout) {
  return page
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode }
}

export default Error