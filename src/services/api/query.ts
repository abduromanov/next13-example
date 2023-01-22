/* eslint-disable react-hooks/rules-of-hooks */
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const query = <ApiRequest, ApiResponse = any>(
  url: string,
  defaultQueryKey: QueryKey = [""],
  queryOptions?: any,
) => {
  const get = (initialData?: Record<string, any>, config?: AxiosRequestConfig) => {
    return useQuery(
      defaultQueryKey,
      () => {
        return axios.get<ApiRequest, AxiosResponse<ApiResponse>>(url, config)
      },
      {
        initialData: initialData,
        ...queryOptions
      },
    )
  }

  const paginate = (page: number, config?: AxiosRequestConfig) => {
    return useQuery(
      [...defaultQueryKey, page],
      () => {
        return axios.get<ApiRequest, AxiosResponse<ApiResponse>>(url, config)
      },
      queryOptions,
    )
  }

  const post = () => {
    return useMutation<AxiosResponse<ApiResponse>, AxiosError, ApiRequest, unknown>(
      (values: ApiRequest) => {
        return axios.post<ApiRequest, AxiosResponse<ApiResponse>>(url, values);
      },
    )
  }

  return { get, paginate, post }
};

export default query;