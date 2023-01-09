/* eslint-disable react-hooks/rules-of-hooks */
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const query = <ApiRequest, ApiResponse = any>(
  url: string,
  defaultQueryKey: QueryKey = [""],
  queryOptions?: any,
) => {
  // const headers = {};

  const get = (initialData?: Record<string, any>, config?: AxiosRequestConfig) => {
    return useQuery(
      defaultQueryKey,
      () => axios.get<ApiRequest, ApiResponse>(url, { ...config?.data }),
      {
        initialData: initialData,
        ...queryOptions
      },
    )
  }

  const post = () => {
    return useMutation<AxiosResponse<ApiResponse>, AxiosError, ApiRequest, unknown>(
      (values: ApiRequest) => {
        return axios.post<ApiRequest, AxiosResponse<ApiResponse>>(url, values);
      },
    )
  }

  return { get, post }
};

export default query;