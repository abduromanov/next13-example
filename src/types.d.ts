export type Disclosure = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

export interface TResponse<T = unknown> {
  data?: T | [];
}

export interface AuthPropsType {
  id?: string;
  member?: Partial<TAnggota>;
  isAdmin?: boolean;
}

export type TAnggota = {
  id: string;
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
};