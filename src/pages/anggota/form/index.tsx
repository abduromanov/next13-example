import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  GridItem,
  Heading,
  ListItem,
  OrderedList,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { InputText } from "@/components/Forms/InputText";
import { InputTextarea } from "@/components/Forms/InputTextarea";

import { NextPageWithLayout } from "@/pages/_app";

import { TAnggota, TFormRequest } from "@/types";

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
      pageTitle: "Form Pengajuan",
    },
  };
};

export default function Page() {
  const router = useRouter();
  const form = useForm<TFormRequest>();

  const submitHandler = (value: TFormRequest) => {
    sessionStorage.setItem("requestData", JSON.stringify(value));
    router.push("/anggota/form/print");
  };

  return (
    <Container maxW="container.lg" pt={8} pb={10}>
      <Stack spacing={8}>
        <Heading className="capitalize">
          Form Pengajuan {router.query.type}
        </Heading>
        <Card>
          <CardHeader>
            <Heading size="md" textAlign="center">
              Permohonan dan Pengajuan Pembiayaan Koperasi Syariah Hamasah
            </Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <Stack spacing={8}>
              <SimpleGrid columns={[1, 2]} gap={5}>
                <GridItem>
                  <InputText
                    label="Nama Anggota"
                    value={form.getValues("nama")}
                    register={{
                      ...form.register("nama"),
                    }}
                  />
                </GridItem>
                <GridItem>
                  <InputText
                    label="Alamat Email"
                    value={form.getValues("email")}
                    register={{
                      ...form.register("email"),
                    }}
                    type="email"
                  />
                </GridItem>
                <GridItem>
                  <InputText
                    label="Nomor ID HNI"
                    value={form.getValues("idHNI")}
                    register={{
                      ...form.register("idHNI"),
                    }}
                    inputMode="numeric"
                  />
                </GridItem>
                <GridItem>
                  <InputText
                    label="Nomor Telp Rumah"
                    value={form.getValues("telpRumah")}
                    register={{
                      ...form.register("telpRumah"),
                    }}
                    type="tel"
                  />
                </GridItem>
                <GridItem rowSpan={2}>
                  <InputTextarea
                    label="Alamat"
                    value={form.getValues("alamat")}
                    register={{
                      ...form.register("alamat"),
                    }}
                    rows={6}
                  />
                </GridItem>
                <GridItem>
                  <InputText
                    label="Nomor HP/WA"
                    value={form.getValues("telpWA")}
                    register={{
                      ...form.register("telpWA"),
                    }}
                    type="tel"
                  />
                </GridItem>
                <GridItem>
                  <InputText
                    label="Nama Mentor"
                    value={form.getValues("nama")}
                    register={{
                      ...form.register("nama"),
                    }}
                  />
                </GridItem>
              </SimpleGrid>
              <Divider />
              <SimpleGrid columns={[1, 2]} gap={5}>
                <GridItem>
                  <Stack spacing={5}>
                    <Box>
                      <InputText
                        label="Jumlah"
                        value={form.getValues("jumlah")}
                        register={{
                          ...form.register("jumlah"),
                          onChange: (e) => {
                            form.setValue(
                              "jumlah",
                              !isNaN(parseInt(e.target.value))
                                ? parseInt(
                                    e.target.value.replace(/\D/g, ""),
                                    10
                                  ).toLocaleString("id-ID")
                                : ""
                            );
                            return e.target.value;
                          },
                        }}
                        inputMode="numeric"
                      />
                    </Box>
                    <Box>
                      <InputText
                        label="Jangka Waktu (Bulan)"
                        value={form.getValues("jangkaWaktu")}
                        register={{
                          ...form.register("jangkaWaktu"),
                        }}
                        type="number"
                      />
                    </Box>
                    <Box>
                      <InputTextarea
                        label="Keperluan"
                        value={form.getValues("keperluan")}
                        register={{
                          ...form.register("keperluan"),
                        }}
                        rows={6}
                      />
                    </Box>
                  </Stack>
                </GridItem>
                {router.query.type === "syirkah" && (
                  <GridItem>
                    <Stack spacing={5}>
                      <Box>
                        <InputText
                          label="Nama Usaha"
                          value={form.getValues("namaUsaha")}
                          register={{
                            ...form.register("namaUsaha"),
                          }}
                          inputMode="numeric"
                        />
                      </Box>
                      <Box>
                        <InputText
                          label="Pembiayaan Musyarokah"
                          value={form.getValues("musyarakah")}
                          register={{
                            ...form.register("musyarakah"),
                          }}
                        />
                      </Box>
                      <Box>
                        <InputText
                          label="Modal Awal"
                          value={form.getValues("modalAwal")}
                          register={{
                            ...form.register("modalAwal"),
                            onChange: (e) => {
                              form.setValue(
                                "modalAwal",
                                !isNaN(parseInt(e.target.value))
                                  ? parseInt(
                                      e.target.value.replace(/\D/g, ""),
                                      10
                                    ).toLocaleString("id-ID")
                                  : ""
                              );
                              return e.target.value;
                            },
                          }}
                          inputMode="numeric"
                        />
                      </Box>
                    </Stack>
                  </GridItem>
                )}
              </SimpleGrid>
              <Divider />
              <Box>
                <Text fontWeight="bold" fontSize="lg" mb={3}>
                  Syarat Pengajuan Permohonan Pembiayaan :
                </Text>
                <OrderedList mb={3} spacing={1}>
                  <ListItem>
                    Mengisi formulir permohonan pengajuan pembiayaan
                  </ListItem>
                  <ListItem>Foto Copy KTP</ListItem>
                  <ListItem>Foto Copy KTP Suami, Istri/Orang Tua</ListItem>
                  <ListItem>
                    Statement BONUS PENDAPATAN BERSIH HNI 4 Bulan Terakhir
                  </ListItem>
                  <ListItem>Surat Rekomendasi dari LED Mentor</ListItem>
                  <ListItem>RAB dan Kontraktor*</ListItem>
                </OrderedList>
                <Text mb={3}>*Untuk Pembiayaan Renovasi</Text>
                <Text fontWeight="bold" fontSize="lg">
                  Dengan pengajuan ini saya bersedia mentaati segala ketentuan
                  dan peraturan yang berlaku di KOPERASI SYARIAH HAMASAH.
                </Text>
              </Box>
              <Button onClick={form.handleSubmit(submitHandler)}>
                Cetak Formulir
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </Container>
  );
}

Page.getLayout = function getLayout(page: NextPageWithLayout) {
  return page;
};
