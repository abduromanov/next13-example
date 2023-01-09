import {
  Badge,
  Button,
  ButtonGroup,
  Card, CardBody, CardHeader, Center, Divider, Flex, Grid, GridItem, Heading, HStack, Input,
  Select,
  Spacer, Switch, Table,
  TableContainer,
  Tbody, Td,
  Text, Th, Thead,
  Tr, VStack
} from "@chakra-ui/react";
import { GetStaticProps } from "next";

// import { useEffect, useState } from "react";
import TableComp from "@/components/Tables/Table";

type TStaticProps = {
  pageTitle: string
}

export const getStaticProps: GetStaticProps<TStaticProps> = async () => {
  return {
    props: {
      pageTitle: 'Simpanan'
    }
  }
}
const BadgeTipe = (tipe: any) => {
  if (tipe == 'debit') {
    return <Badge colorScheme='green'>{tipe}</Badge>
  } else {
    return <Badge colorScheme='purple'>{tipe}</Badge>
  }
}
const dataSimpanan = [{
  tanggal: '15/10/2022',
  tipe: 'debit',
  Nominal: '10.000',
  saldo: '30.000',
  keterangan: 'masuk pertama'
}, {
  tanggal: '15/10/2022',
  tipe: 'kredit',
  Nominal: '210.000',
  saldo: '30.000',
  keterangan: 'masuk kedua'
}, {
  tanggal: '15/10/2022',
  tipe: 'debit',
  Nominal: '20.000',
  saldo: '40.000',
  keterangan: 'masuk ketiga'
}]
const totSimpanan = {
  nama: 'Adinda',
  noAngota: '019231230',
  simpananPokok: 'Rp2.000.000',
  simpananWajib: 'Rp1.200.000',
  simpananKhusus: 'Rp5.200.000',
  simpananSukarela: 'Rp1.000.000',
}
export default function Page() {
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //   })
  // }, [])
  return (
    <VStack px={8} spacing={8}>
      <Card p='5' bg='white' boxShadow='md' w='100%'>
        <CardHeader >
          <Center>
            <Heading w='60%' size='md' lineHeight='8' textAlign='center'>Total Simpanan Anggota Koperasi Syariah Jasa Hamasah</Heading>
          </Center>
        </CardHeader>
        <Divider />
        <CardBody>
          <Grid templateColumns={{ base: '100% 1fr', lg: 'repeat(6, 1fr)' }} gap={{ base: 0, lg: 8 }}>
            <GridItem colSpan={3} mb='4'>
              <VStack alignItems="start">
                <HStack spacing='132px'>
                  <Text>Nama</Text>
                  <Text>{totSimpanan.nama}</Text>
                </HStack>
                <HStack spacing='87px'>
                  <Text>No Anggota</Text>
                  <Text>{totSimpanan.noAngota}</Text>
                </HStack>
              </VStack>
            </GridItem>
            <GridItem colSpan={3}>
              <VStack alignItems="start">
                <HStack spacing='54px'>
                  <Text>Simpanan Pokok</Text>
                  <Text>{totSimpanan.simpananPokok}</Text>
                </HStack>
                <HStack spacing='58px'>
                  <Text>Simpanan Wajib</Text>
                  <Text>{totSimpanan.simpananWajib}</Text>
                </HStack>
                <HStack spacing='47px'>
                  <Text>Simpanan Khusus</Text>
                  <Text>{totSimpanan.simpananKhusus}</Text>
                </HStack>
                <HStack spacing='39px'>
                  <Text>Simpanan Sukarela</Text>
                  <Text>{totSimpanan.simpananSukarela}</Text>
                </HStack>
                <Divider />
                <HStack spacing='57px'>
                  <Text fontWeight='bold'>Total Simpanan</Text>
                  <Text>{totSimpanan.simpananSukarela}</Text>
                </HStack>
              </VStack>
            </GridItem>
          </Grid>
        </CardBody>
      </Card>
      <Card w='100%'>
        <CardHeader>
          <Flex>
            <Spacer />
            <ButtonGroup gap='2'>
              <Button colorScheme='teal'>Debit</Button>
              <Button colorScheme='yellow'>Kredit</Button>
            </ButtonGroup>
          </Flex>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table variant='unstyled'>
            <Thead>
              <Tr>
                <Th>Filter Tanggal</Th>
                <Th>Filter Jenis Simpanan</Th>
                <Th>Urutkan data</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td><Switch id='filter-tanggal' mr='3' />  <Input placeholder='select date' type='date' w="35%" /><Input placeholder='select date' type='date' w="35%" /></Td>
                <Td><Select placeholder="select option"><option>option 1</option><option>option 2</option></Select></Td>
                <Td><Select placeholder="select option"><option>option 1</option><option>option 2</option></Select></Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      <TableContainer boxShadow='lg' p='5' rounded='md' bg='white' w='100%'>
        <Table variant='simple' size='lg'>
          <Thead>
            <Tr>
              <Th>Tanggal</Th>
              <Th>Tipe</Th>
              <Th isNumeric>Nominal</Th>
              <Th>Keterangan</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataSimpanan.map((item, index) => (
              <>
                <TableComp key={index} tanggal={item.tanggal} tipe={BadgeTipe(item.tipe)} nominal={item.Nominal} keterangan={item.keterangan} />
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack >
  );
};
