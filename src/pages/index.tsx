import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  Skeleton,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { A11y, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useAnggotaDetail } from "@/services/api/commands/anggota.command";
import { usePengumuman } from "@/services/api/commands/pengumuman.command";

import { TAnggota } from "@/types";

interface TPageProps {
  pageTitle: string;
  anggota: TAnggota;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota: TAnggota = JSON.parse(req.cookies.anggota || "");

  return {
    props: {
      pageTitle: "Home",
      anggota: anggota,
    },
  };
};

export default function Page(pageProps: TPageProps) {
  const anggotaQuery = useAnggotaDetail(pageProps.anggota.id).query(
    {},
    pageProps.anggota
  );

  pageProps.string;

  const pengumumanQuery = usePengumuman(["home"]).query({
    params: {
      limit: 5,
      filter: {
        active: true,
      },
    },
  });

  const isLoading = anggotaQuery.isLoading || pengumumanQuery.isLoading;

  const anggota = anggotaQuery.data?.data?.data;
  const pengumuman = pengumumanQuery.data?.data?.data;

  return (
    <VStack px={8} spacing={8}>
      <VStack>
        <Skeleton isLoaded={!isLoading}>
          <Heading>Selamat Datang, {anggota?.nama}</Heading>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text>No. Anggota: {anggota?.idAnggota}</Text>
        </Skeleton>
      </VStack>
      <Grid
        templateColumns={{ base: "100% 1fr", lg: "repeat(6, 1fr)" }}
        gap={{ base: 0, lg: 8 }}
      >
        <GridItem colSpan={4}>
          <Card w={"full"}>
            <CardHeader>
              <Heading size={"md"}>Pengumuman</Heading>
            </CardHeader>
            <CardBody>
              <Skeleton isLoaded={!isLoading} rounded="lg">
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  loop
                >
                  {pengumuman?.map((item) => (
                    <SwiperSlide className="items-center" key={item.id}>
                      <Box
                        w={"full"}
                        h={500}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Image
                          alt={item.id}
                          src={`${process.env.API_URL}/assets/${item.image}?access_token=${process.env.API_TOKEN}&quality=20`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Skeleton>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={2} mt={{ base: 8, lg: 0 }}>
          <Card>
            <CardHeader>
              <Heading size={"md"}>Informasi Anggota</Heading>
            </CardHeader>
            <CardBody>
              <VStack divider={<StackDivider />} align={"stretch"} spacing={4}>
                <HStack justifyContent={"space-between"}>
                  <Text>Alamat</Text>
                  <Text>{anggota?.alamat}</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text>Pinjaman Murobahah</Text>
                  <Text>Jl. Raya Bekasi</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text>Pinjaman Syirkah</Text>
                  <Text>Jl. Raya Bekasi</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </VStack>
  );
}
