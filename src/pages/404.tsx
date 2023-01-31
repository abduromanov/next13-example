import { Heading, Stack } from "@chakra-ui/react";

export default function Custom404() {
  return (
    <Stack
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"6"}
    >
      <Heading size={"4xl"}>404</Heading>
      <p>Page Not Found</p>
    </Stack>
  );
}
