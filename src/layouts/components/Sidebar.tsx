import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as Heroicon from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import menus from "@/services/utils/menus";

import { Disclosure } from "@/types";

type Props = {
  disclosure: Disclosure;
};

const MenuItem = () => (
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
  return (
    <>
      <Flex
        px={6}
        py={8}
        bg={"brand.500"}
        minH={"full"}
        minW={"2xs"}
        maxW={"2xs"}
        pos={"fixed"}
        sx={{
          display: "none",
          "@media(min-width: 1024px)": {
            display: "flex",
          },
        }}
      >
        <MenuItem />
      </Flex>
      <Drawer
        placement="left"
        onClose={props.disclosure.onClose}
        isOpen={props.disclosure.isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody px={6} py={8} bg={"brand.500"}>
            <MenuItem />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
