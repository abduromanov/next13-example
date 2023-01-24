/* eslint-disable react-hooks/rules-of-hooks */
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

import { DirectusResponse } from "@/types";

const queryMutation = <ApiRequest, ApiResponse = any>({
  defaultQueryKey = [""],
  url,
  queryFn,
  queryOptions,
}: {
  defaultQueryKey: QueryKey,
  url?: string,
  queryFn?: () => Promise<AxiosResponse<DirectusResponse<ApiResponse>>>,
  queryOptions?: any,
}) => {
  const query = (initialData?: Record<string, any>, options?: any) => {
    return useQuery<Partial<AxiosResponse<DirectusResponse<ApiResponse>>>, AxiosError>({
      queryKey: defaultQueryKey,
      queryFn: queryFn,
      initialData: initialData,
      ...queryOptions,
      ...options
    })
  }

  const mutate = () => {
    return useMutation<AxiosResponse<ApiResponse>, AxiosError, ApiRequest, unknown>(
      (values: ApiRequest) => {
        return axios.post<ApiRequest, AxiosResponse<ApiResponse>>(url || '', values);
      },
    )
  }

  return { query, mutate }
};

export default queryMutation;