'use client';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Flex, Text, Button } from '@radix-ui/themes';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);

  // Early return logic
  if (pageCount <= 1) return null; // This is fine, it won't affect hooks

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text>Page {currentPage} of {pageCount}</Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
        <ChevronRightIcon />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

const PaginationPage = ({ itemCount, pageSize, currentPage }: Props) =>{
    return(
        <Suspense>
            <Pagination itemCount={itemCount} pageSize={pageSize} currentPage={currentPage}/>
        </Suspense>
    )
}


export default PaginationPage;
