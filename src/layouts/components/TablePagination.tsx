import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
  usePagination,
} from "@ajna/pagination";
import { Flex, HStack, Icon, Select, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  pagination: ReturnType<typeof usePagination>;
};

export default function TablePagination({ pagination }: Props) {
  return (
    <Flex justifyContent="space-between">
      <HStack alignItems="center" spacing="3">
        <Select
          w="20"
          size="sm"
          onChange={(e) => pagination.setPageSize(Number(e.target.value))}
          defaultValue={pagination.pageSize}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </Select>
        <Text fontSize="sm">per halaman</Text>
      </HStack>
      <Pagination
        currentPage={pagination.currentPage}
        onPageChange={(page) => {
          pagination.setCurrentPage(page);
          pagination.setPageSize(pagination.pageSize);
        }}
        pagesCount={pagination.pagesCount}
      >
        <PaginationContainer align="center" w="50%" justifyContent="end">
          <PaginationPrevious
            w={8}
            h={8}
            variant="ghost"
            onClick={() =>
              pagination.setCurrentPage(pagination.currentPage - 1)
            }
          >
            <Icon as={ChevronLeftIcon} color={"gray.600"} fontSize="xs" />
          </PaginationPrevious>
          <PaginationPageGroup
            mx={1}
            isInline
            align="center"
            separator={
              <PaginationSeparator fontSize="xs" w={8} h={8} variant="ghost" />
            }
          >
            {pagination.pages.map((page) => (
              <PaginationPage
                key={`page-${page}`}
                page={page}
                fontSize="xs"
                fontWeight="medium"
                color="gray.600"
                variant="ghost"
                w={8}
                h={8}
                _current={{
                  bg: "brandSecondary.400",
                  color: "white",
                  disabled: true,
                  _hover: {
                    bg: "brandSecondary.400",
                  },
                  _disabled: {
                    opacity: 1,
                    pointerEvents: "none",
                  },
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext w={8} h={8} variant="ghost">
            <Icon as={ChevronRightIcon} color={"gray.600"} fontSize="xs" />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Flex>
  );
}
