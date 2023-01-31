import { QueryClient } from "@tanstack/react-query";

export default function queryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}
