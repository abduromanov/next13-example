import _ from "lodash";

export type TSidebarMenu = {
  label: string;
  icon: string;
  route: string;
  group: string;
};

const list: TSidebarMenu[] = [
  {
    label: "Home",
    icon: "HomeIcon",
    route: "/admin/home",
    group: "",
  },
  {
    label: "Simpanan",
    icon: "WalletIcon",
    route: "/admin/simpanan",
    group: "Simpanan",
  },
  {
    label: "Murobahah",
    icon: "BanknotesIcon",
    route: "/admin/pinjaman/murobahah",
    group: "Pinjaman",
  },
  {
    label: "Syirkah",
    icon: "BuildingStorefrontIcon",
    route: "/admin/pinjaman/syirkah",
    group: "Pinjaman",
  },
  {
    label: "Daftar Anggota",
    icon: "UsersIcon",
    route: "/admin/anggota",
    group: "Anggota",
  },
  {
    label: "Pengumuman",
    icon: "Square2StackIcon",
    route: "/admin/pengumuman",
    group: "Pengaturan",
  },
];

const menus = _.groupBy(list, "group");

export default menus;
