import { Box, Card, CardBody, CardHeader, Grid, GridItem, Heading, HStack, StackDivider, Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { A11y, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type TPageProps = {
  pageTitle: string
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: 'Home'
    }
  }
}

export default function Page() {
  return (
    <VStack px={8} spacing={8}>
      <VStack>
        <Heading>Selamat Datang, User</Heading>
        <Text>No. Anggota: 019231230</Text>
      </VStack>
      <Grid templateColumns={{ base: '100% 1fr', lg: 'repeat(6, 1fr)' }} gap={{ base: 0, lg: 8 }}>
        <GridItem colSpan={4}>
          <Card w={'full'}>
            <CardHeader>
              <Heading size={'md'}>Pengumuman</Heading>
            </CardHeader>
            <CardBody>
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                <SwiperSlide className="items-center">
                  <Box w={'full'} h={300} bg={'blue.100'} display={'flex'} alignItems={'center'} justifyContent={'center'}>Slide</Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box w={'full'} h={300} bg={'blue.100'} display={'flex'} alignItems={'center'} justifyContent={'center'}>Slide</Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box w={'full'} h={300} bg={'blue.100'} display={'flex'} alignItems={'center'} justifyContent={'center'}>Slide</Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box w={'full'} h={300} bg={'blue.100'} display={'flex'} alignItems={'center'} justifyContent={'center'}>Slide</Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box w={'full'} h={300} bg={'blue.100'} display={'flex'} alignItems={'center'} justifyContent={'center'}>Slide</Box>
                </SwiperSlide>
              </Swiper>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem colSpan={2} mt={{ base: 8, lg: 0 }}>
          <Card>
            <CardHeader>
              <Heading size={'md'}>Informasi Anggota</Heading>
            </CardHeader>
            <CardBody>
              <VStack divider={<StackDivider />} align={'stretch'} spacing={4}>
                <HStack justifyContent={'space-between'}>
                  <Text>Alamat</Text>
                  <Text>Jl. Raya Bekasi</Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text>Pinjaman Murobahah</Text>
                  <Text>Jl. Raya Bekasi</Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
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
};
