import { usePagination } from "@ajna/pagination";

const useCustomPagination = (total?: number) => usePagination({
  total: total,
  initialState: {
    currentPage: 1,
    pageSize: 10,
  },
  limits: {
    inner: 2,
    outer: 2
  }
});

export default useCustomPagination;