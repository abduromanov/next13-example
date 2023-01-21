import { Pagination, PaginationContainer, PaginationNext, PaginationPage, PaginationPageGroup, PaginationPrevious, PaginationSeparator, usePagination } from "@ajna/pagination";
import { Flex, HStack, Icon, Select, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Props = {
  total?: number;
}

export default function TablePagination(props: Props) {
  const [perPage, setPerPage] = useState<number>(10);

  const pagination = usePagination({
    total: props.total,
    limits: {
      inner: 3,
      outer: 3
    },
    initialState: {
      pageSize: perPage,
      currentPage: 1,
    }
  });

  return (
    <Flex justifyContent='space-between'>
      <HStack alignItems='center' spacing='3'>
        <Select w='20' size='sm' onChange={(e) => setPerPage(Number(e.target.value))}>
          <option value="10">10</option>
          <option value="10">25</option>
          <option value="10">50</option>
        </Select>
        <Text fontSize='sm'>per halaman</Text>
      </HStack>
      <Pagination
        currentPage={pagination.currentPage}
        onPageChange={(page) => pagination.setCurrentPage(page)}
        pagesCount={pagination.pagesCount}
      >
        <PaginationContainer
          align='center'
          w='50%'
          justifyContent='end'
        >
          <PaginationPrevious
            w={8}
            h={8}
            variant='ghost'
          >
            <Icon as={ChevronLeftIcon} color={'gray.600'} fontSize='xs' />
          </PaginationPrevious>
          <PaginationPageGroup
            mx={1}
            isInline
            align="center"
            separator={
              <PaginationSeparator
                fontSize="xs"
                w={8}
                h={8}
                variant='ghost'
              />
            }
          >
            {pagination.pages.map(page => (
              <PaginationPage
                key={`page-${page}`}
                page={page}
                fontSize='xs'
                fontWeight='medium'
                color='gray.600'
                variant='ghost'
                w={8}
                h={8}
                _current={{
                  bg: 'brandSecondary.400',
                  color: 'white',
                  disabled: true,
                  _hover: {
                    bg: 'brandSecondary.400'
                  },
                  _disabled: {
                    opacity: 1,
                    pointerEvents: 'none'
                  }
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            w={8}
            h={8}
            variant='ghost'
          >
            <Icon as={ChevronRightIcon} color={'gray.600'} fontSize='xs' />
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Flex>
  )
};
