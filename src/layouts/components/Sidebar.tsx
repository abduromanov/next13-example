import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Portal,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import * as Heroicon from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import menus from "@/services/utils/menus";

type Props = {
  disclosure: ReturnType<typeof useDisclosure>;
};

const MenuItem = (props: { route: string }) => (
  <VStack textColor={"white"} spacing={8}>
    <Image
      src={require("@/assets/circle.png")}
      alt=""
      className="max-w-[70%]"
      priority
    />
    {Object.keys(menus).map((item, index) => (
      <VStack w={"full"} alignItems={"start"} key={index}>
        <Text fontSize={"sm"}>{item}</Text>
        {menus[item].map((item, index) => (
          <Link href={item.route} className={"w-full"} key={index}>
            <Button
              variant={"ghost"}
              color="white"
              verticalAlign={"center"}
              w={"full"}
              bg={
                item.route === props.route
                  ? "brand.400"
                  : "transparent"
              }
              justifyContent={"start"}
              _hover={{ bg: "brand.400" }}
              m={0}
            >
              <Icon as={(Heroicon as any)[item.icon]} fontSize={"2xl"} />
              <Text ms={3}>{item.label}</Text>
            </Button>
          </Link>
        ))}
      </VStack>
    ))}
  </VStack>
);

export default function Sidebar(props: Props) {
  const router = useRouter();

  return (
    <>
      <Flex
        px={6}
        py={8}
        bg={"brand.500"}
        minH={"full"}
        w={"2xs"}
        pos={"fixed"}
        sx={{
          display: "none",
          "@media(min-width: 1024px)": {
            display: "flex",
          },
        }}
      >
        <MenuItem route={router.pathname} />
      </Flex>

      <Portal>
        <Drawer
          placement="left"
          onClose={props.disclosure.onClose}
          isOpen={props.disclosure.isOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody px={6} py={8} bg={"brand.500"}>
              <MenuItem route={router.pathname} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Portal>
    </>
  );
}
