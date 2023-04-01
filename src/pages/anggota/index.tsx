import {
  Box,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { A11y, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { usePengumuman } from "@/services/api/commands/pengumuman.command";

import { TAnggota } from "@/types";

interface TPageProps {
  anggota: TAnggota;
  pageTitle: string;
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async ({
  req,
}) => {
  const anggota: TAnggota = JSON.parse(req.cookies.anggota || "{}");

  return {
    props: {
      anggota: anggota,
      pageTitle: "Anggota",
    },
  };
};

export default function Page() {
  const pengumumanQuery = usePengumuman(["home"]).query({
    params: {
      limit: 5,
      filter: {
        active: true,
      },
    },
  });

  const pengumuman = pengumumanQuery.data?.data?.data;

  return (
    <Stack spacing="8">
      <Skeleton isLoaded={!pengumumanQuery.isLoading} rounded="lg">
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
                h={[300, 500]}
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
    </Stack>
  );
}
