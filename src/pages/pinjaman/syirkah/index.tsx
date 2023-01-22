import { Box, Card, CardBody, CardHeader, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react"
import { GetServerSideProps } from "next"

import TableSyirkah from "@/components/Tables/TableSyirkah"

type TPageProps = {
  pageTitle: string
}

export const getServerSideProps: GetServerSideProps<TPageProps> = async () => {
  return {
    props: {
      pageTitle: 'Syirkah'
    }
  }
}

const dataSyirkah = [{
  namaBC: 'makan malam',
  namaAnggota: 'admin',
  idanggota: '123456789',
  modalAwal: 'cicil rumah',
  modalHamasah: 'Rp.10.900.000',
  tglMulai: 'Rp.27.800.000',
  tglSelesai: '30 September 2022',
}, {
  namaBC: 'makan malam',
  namaAnggota: 'admin',
  idanggota: '123456789',
  modalAwal: 'cicil rumah',
  modalHamasah: 'Rp.10.900.000',
  tglMulai: 'Rp.27.800.000',
  tglSelesai: '30 September 2022',
}, {
  namaBC: 'makan malam',
  namaAnggota: 'admin',
  idanggota: '123456789',
  modalAwal: 'cicil rumah',
  modalHamasah: 'Rp.10.900.000',
  tglMulai: 'Rp.27.800.000',
  tglSelesai: '30 September 2022',
}, {
  namaBC: 'makan malam',
  namaAnggota: 'admin',
  idanggota: '123456789',
  modalAwal: 'cicil rumah',
  modalHamasah: 'Rp.10.900.000',
  tglMulai: 'Rp.27.800.000',
  tglSelesai: '30 September 2022',
}, {
  namaBC: 'makan malam',
  namaAnggota: 'admin',
  idanggota: '123456789',
  modalAwal: 'cicil rumah',
  modalHamasah: 'Rp.10.900.000',
  tglMulai: 'Rp.27.800.000',
  tglSelesai: '30 September 2022',
}, {
  namaBC: 'makan malam',
  namaAnggota: 'admin',
  idanggota: '123456789',
  modalAwal: 'cicil rumah',
  modalHamasah: 'Rp.10.900.000',
  tglMulai: 'Rp.27.800.000',
  tglSelesai: '30 September 2022',
}]

export default function PageSyirkah() {
  return (
    <>
      <Box>
        <Card>
          <CardHeader>

          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Nama BC</Th>
                    <Th>Nama Anggota</Th>
                    <Th>ID Anggota</Th>
                    <Th>Modal Awal</Th>
                    <Th>Modal Hamasah</Th>
                    <Th>Tanggal Mulai</Th>
                    <Th>Tanggal Seleksi</Th>
                    <Th>Aksi</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataSyirkah.map((item, index) => (
                    <TableSyirkah key={index} item={item} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}