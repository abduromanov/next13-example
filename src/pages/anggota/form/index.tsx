import { Box, Button, Card, CardBody, CardHeader, Container, Divider, FormLabel, GridItem, Heading, Input, ListItem, OrderedList, SimpleGrid, Stack, Text, Textarea } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { NextPageWithLayout } from "@/pages/_app";

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
  const router = useRouter();

  return (
    <Container maxW="container.lg" pt={8} pb={10}>
      <Stack spacing={8}>
        <Heading className="capitalize">Form Pengajuan {router.query.type}</Heading>
        <Card>
          <CardHeader>
            <Heading size="md" textAlign="center">Permohonan dan Pengajuan Pembiayaan Koperasi Syariah Hamasah</Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Stack spacing={8}>
              <SimpleGrid columns={[1, 2]} gap={5}>
                <GridItem>
                  <FormLabel>
                    Nama Anggota
                  </FormLabel>
                  <Input
                    variant="outline"
                  />
                </GridItem>
                <GridItem>
                  <FormLabel>
                    Alamat Email
                  </FormLabel>
                  <Input
                    variant="outline"
                  />
                </GridItem>
                <GridItem>
                  <FormLabel>
                    Nomor ID HNI
                  </FormLabel>
                  <Input
                    variant="outline"
                  />
                </GridItem>
                <GridItem>
                  <FormLabel>
                    Nomor Telp Rumah
                  </FormLabel>
                  <Input
                    variant="outline"
                  />
                </GridItem>
                <GridItem rowSpan={2}>
                  <FormLabel>
                    Alamat
                  </FormLabel>
                  <Textarea
                    variant="outline"
                    rows={5}
                  />
                </GridItem>
                <GridItem>
                  <FormLabel>
                    Nomor HP/WA
                  </FormLabel>
                  <Input
                    variant="outline"
                  />
                </GridItem>
                <GridItem>
                  <FormLabel>
                    Nama Mentor
                  </FormLabel>
                  <Input
                    variant="outline"
                  />
                </GridItem>
              </SimpleGrid>
              <Divider />
              <SimpleGrid columns={[1, 2]} gap={5}>
                <GridItem>
                  <Stack spacing={5}>
                    <Box>
                      {/* TODO: add currency formatter */}
                      <FormLabel>
                        Jumlah
                      </FormLabel>
                      <Input
                        variant="outline"
                      />
                    </Box>
                    <Box>
                      <FormLabel>
                        Jangka Waktu (Bulan)
                      </FormLabel>
                      <Input
                        variant="outline"
                      />
                    </Box>
                    <Box>
                      <FormLabel>
                        Keperluan
                      </FormLabel>
                      <Textarea
                        variant="outline"
                        rows={6}
                      />
                    </Box>
                  </Stack>
                </GridItem>
                {router.query.type === 'syirkah' && (
                  <GridItem>
                    <Stack spacing={5}>
                      <Box>
                        <FormLabel>
                          Nama Usaha
                        </FormLabel>
                        <Input
                          variant="outline"
                        />
                      </Box>
                      <Box>
                        <FormLabel>
                          Pembiyaan Musyarakah
                        </FormLabel>
                        <Input
                          variant="outline"
                        />
                      </Box>
                      <Box>
                        {/* TODO: add currency formatter */}
                        <FormLabel>
                          Modal Awal
                        </FormLabel>
                        <Input
                          variant="outline"
                        />
                      </Box>
                    </Stack>
                  </GridItem>
                )}
              </SimpleGrid>
              <Divider />
              <Box>
                <Text fontWeight="bold" fontSize="lg" mb={3}>Syarat Pengajuan Permohonan Pembiayaan :</Text>
                <OrderedList mb={3} spacing={1}>
                  <ListItem>Mengisi formulir permohonan pengajuan pembiayaan</ListItem>
                  <ListItem>Foto Copy KTP</ListItem>
                  <ListItem>Foto Copy KTP Suami, Istri/Orang Tua</ListItem>
                  <ListItem>Statement BONUS PENDAPATAN BERSIH HNI 4 Bulan Terakhir</ListItem>
                  <ListItem>Surat Rekomendasi dari LED Mentor</ListItem>
                  <ListItem>RAB dan Kontraktor*</ListItem>
                </OrderedList>
                <Text mb={3}>*Untuk Pembiayaan Renovasi</Text>
                <Text fontWeight="bold" fontSize="lg">Dengan pengajuan ini saya bersedia mentaati segala ketentuan dan peraturan yang berlaku di KOPERASI SYARIAH HAMASAH.</Text>
              </Box>
              <Button>Cetak Formulir</Button>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
};

Page.getLayout = function getLayout(page: NextPageWithLayout) {
  return page;
};