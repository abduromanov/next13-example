export type Disclosure = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

export interface DirectusResponse<T> {
  data: T;
  meta?: {
    total_count: number;
    filter_count: number;
  };
  totalSimpanan?: TTotalSimpanan;
}
export interface TResponse<T = unknown> {
  data?: T | [];
  message?: string;
}

export interface AuthPropsType {
  id?: string;
  member?: Partial<TAnggota>;
  isAdmin?: boolean;
}

export interface TAnggota {
  id: number;
  idAnggota: string;
  nama: string;
  alamat: string;
  password: string;
  status: string;
  role: roleEnums;
  tglDibuat: string;
  simpananPokok: number;
  isPasswordBaru: boolean;
  tglDihapus: string;
  totalSimpanan: number;
}

export interface TAnggotaRelations {
  mutasiTabungan?: TSimpanan[];
  // murobahah?: TMurobahah[];
}

export interface TSimpanan {
  id: number;
  idAnggota: number;
  catatan: string;
  jenisTabungan: "wajib" | "khusus" | "sukarela";
  saldo: number;
  nominal: number;
  saldo: number;
  tglDibuat: string;
  tglDiubah: string;
}

export interface TTotalSimpanan {
  wajib: number;
  khusus: number;
  sukarela: number;
  pokok: number;
}

export interface TMurobahah {
  id: string;
  pembiayaan: string;
  pinjaman: number;
  totalPinjaman: number;
  totalMargin: number;
  dp: number;
  total: number;
  cicilan: number;
  margin: number;
  tenor: number;
  tglMulai: string;
  tglSelesai: string;
  lunas: boolean;
}

export interface TMurobahahRelations {
  anggota: Partial<TAnggota>;
  mutasiMurobahah: Partial<TMutasiMurobahah>[];
}

export interface TMutasiMurobahah {
  tglBayar: string;
  cicilan: number;
  margin: number;
  total: number;
  isBulat: boolean;
  tenorTerbayar: number;
  bulanTidakSesuai: number;
}

export interface TMutasiMurobahahRelations {
  murobahah: TMurobahah;
}

export interface TSyirkah {
  id: number;
  tglDibuat: string;
  namaBc: string;
  modalAwal: number;
  modalHamasah: number;
  tglMulai: string;
  tglSelesai: string;
}

export interface TMutasiSyirkah {
  id: number;
  tglDibuat: string;
  modalAwal: number;
  modalHamasah: number;
  totalRO: number;
  bonus: number;
  bonusBersih: number;
  bagiHasil: number;
  pajakBonus: number;
  tglBayar: string;
  presentaseBonus: number;
  catatan: string;
}

export interface TSyirkahRelations {
  anggota: Partial<TAnggota>;
  mutasiSyirkah: Partial<TMutasiSyirkah>[];
}

export interface TPengumuman {
  id: string;
  image: string;
  date_created: string;
  active: boolean;
}
