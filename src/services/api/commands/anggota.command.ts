import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import queryMutation from "../queryMutation";

import { DirectusResponse, TAnggota } from "@/types";

export type TAnggotaRequest = {
  idAnggota: string;
  nama: string;
  password: string;
  alamat: string;
}

export const useAnggota = (config?: AxiosRequestConfig) =>
  queryMutation<any, TAnggota[]>({
    defaultQueryKey: ['anggota', ...Object.values(config?.params)],
    queryFn: () => fetchAnggota(config)
  });

export const fetchAnggota = <ApiRequest = any, ApiResponse = any>(config?: AxiosRequestConfig) => {
  return axios.get<ApiRequest, AxiosResponse<DirectusResponse<ApiResponse>>>('/api/anggota', config)
}

export const useAnggotaDetail = (id: number) =>
  queryMutation<any, TAnggota>({
    defaultQueryKey: ['anggota', id],
    queryFn: () => fetchAnggotaDetail(id)
  });

export const fetchAnggotaDetail = <ApiRequest = any, ApiResponse = any>(id: number, config?: AxiosRequestConfig) => {
  return axios.get<ApiRequest, AxiosResponse<DirectusResponse<ApiResponse>>>(`/api/anggota/${id}`, config)
}

export const useCreateAnggota = () => queryMutation<TAnggotaRequest, TAnggota>({ defaultQueryKey: ['anggota', 'create'], url: '/api/anggota/create' })