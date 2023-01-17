import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';


export default function BreadcrumbSection({ data }: any) {
  return (
    <Breadcrumb m="5" fontSize="sm">
      {data.map(({ name, url }: any, index: any) => {
        return (
          <BreadcrumbItem key={`${index}-${name}`} isCurrentPage={!url}>
            {!url ? (
              <Text color="gray.400">{name}</Text>
            ) : (
              <BreadcrumbLink href={url} as={Link} color="blue.600">
                {name}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}