import _ from "lodash";

export type TSidebarMenu = {
  label: string;
  icon: string;
  route: string;
  group: string;
}

const list: TSidebarMenu[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    route: '/',
    group: '',
  },
  {
    label: 'Simpanan',
    icon: 'WalletIcon',
    route: 'simpanan',
    group: 'Simpanan',
  },
  {
    label: 'Murobahah',
    icon: 'BanknotesIcon',
    route: 'murobahah',
    group: 'Pinjaman'
  },
  {
    label: 'Syirkah',
    icon: 'BuildingStorefrontIcon',
    route: 'syirkah',
    group: 'Pinjaman',
  },
  {
    label: 'Daftar Anggota',
    icon: 'UsersIcon',
    route: 'anggota',
    group: 'Anggota'
  },
  {
    label: 'Pengumuman',
    icon: 'Square2StackIcon',
    route: 'pengumuman',
    group: 'Pengaturan'
  },
];

const menus = _.groupBy(list, 'group');

export default menus;