'use client';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Flex, Text, Button } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface Props{
    itemCount: number
    pageSize : number
    currentPage : number
}
const PaginationPage = ({itemCount, pageSize, currentPage}: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null;
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const changePage = (page : number) =>{
        const params = new URLSearchParams(searchParams);
        params.set('page' , page.toString())
        router.push('?'+ params.toString())
    }

  return (
   <Flex align="center" gap="2">
   <Text>Page {currentPage} of {pageCount}</Text>
   <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(1)} >
    <DoubleArrowLeftIcon />
   </Button>
   <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} >
    <ChevronLeftIcon />
   </Button>
   <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
    <ChevronRightIcon />
   </Button>
   <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
    <DoubleArrowRightIcon />
   </Button> 
   </Flex>
  )
}
export default PaginationPage