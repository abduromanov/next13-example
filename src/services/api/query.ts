/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const query = <ApiRequest, ApiResponse = any>(
  url: string,
  queryOptions?: any,
  defaultQueryKey?: any,
) => {
  // const headers = {};

  const get = (data: AxiosRequestConfig) => {
    return useQuery(
      defaultQueryKey,
      () => {
        return axios.get<ApiRequest, AxiosResponse<ApiResponse>>(url, { ...data });
      },
      { ...queryOptions },
    )
  }

  const post = (data: ApiRequest) => {
    return axios.post<ApiRequest, AxiosResponse<ApiResponse>>(url, { ...data });
  }

  return { get, post }
};

export default query;