/* eslint-disable react-hooks/rules-of-hooks */
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { DirectusResponse } from "@/types";

const queryMutation = <ApiRequest, ApiResponse = any>(
  url: string,
  defaultQueryKey: QueryKey = [""],
  queryOptions?: any
) => {
  const query = (
    config?: AxiosRequestConfig,
    initialData?: Record<string, any>
  ) => {
    return useQuery<
      Partial<AxiosResponse<DirectusResponse<ApiResponse>>>,
      AxiosError
    >({
      queryKey: defaultQueryKey,
      queryFn: () =>
        axios.get<ApiRequest, AxiosResponse<DirectusResponse<ApiResponse>>>(
          url,
          config
        ),
      initialData: initialData,
      ...queryOptions,
    });
  };

  const paginate = (config?: AxiosRequestConfig) => {
    return useQuery<
      Partial<AxiosResponse<DirectusResponse<ApiResponse>>>,
      AxiosError
    >({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: [...defaultQueryKey, ...Object.values(config?.params)],
      queryFn: () =>
        axios.get<ApiRequest, AxiosResponse<DirectusResponse<ApiResponse>>>(
          url,
          config
        ),
      ...queryOptions,
    });
  };

  const mutate = (method: "POST" | "PUT" | "PATCH" | "DELETE") => {
    return useMutation<
      AxiosResponse<ApiResponse>,
      AxiosError,
      ApiRequest,
      unknown
    >((values: ApiRequest) => {
      switch (method) {
        case "POST":
          return axios.put<ApiRequest, AxiosResponse<ApiResponse>>(url, values);

        case "PUT":
          return axios.put<ApiRequest, AxiosResponse<ApiResponse>>(url, values);

        case "PATCH":
          return axios.patch<ApiRequest, AxiosResponse<ApiResponse>>(
            url,
            values
          );

        case "DELETE":
          return axios.put<ApiRequest, AxiosResponse<ApiResponse>>(url, values);

        default:
          return axios.post<ApiRequest, AxiosResponse<ApiResponse>>(
            url,
            values
          );
      }
    });
  };

  return { query, paginate, mutate };
};

export default queryMutation;
