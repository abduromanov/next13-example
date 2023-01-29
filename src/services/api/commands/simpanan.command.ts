import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import queryMutation from "../queryMutation";

import { DirectusResponse, TSimpanan } from "@/types";

export const useSimpanan = (config?: AxiosRequestConfig) =>
  queryMutation<any, TSimpanan[]>({
    defaultQueryKey: ["simpanan", ...Object.values(config?.params)],
    queryFn: () => fetchSimpanan(config),
  });

export const fetchSimpanan = <ApiRequest = any, ApiResponse = any>(
  config?: AxiosRequestConfig
) => {
  return axios.get<ApiRequest, AxiosResponse<DirectusResponse<ApiResponse>>>(
    "/api/simpanan",
    config
  );
};

export const useSimpananDetail = (id: number) =>
  queryMutation<any, TSimpanan>({
    defaultQueryKey: ["simpanan", id],
    queryFn: () => fetchSimpananDetail(id),
  });

export const fetchSimpananDetail = <ApiRequest = any, ApiResponse = any>(
  id: number,
  config?: AxiosRequestConfig
) => {
  return axios.get<ApiRequest, AxiosResponse<DirectusResponse<ApiResponse>>>(
    `/api/simpanan/${id}`,
    config
  );
};
