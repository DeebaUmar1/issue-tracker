import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import FilterByUsers from './FilterByUsers'
import IssueStatusFilter from './FilterIssuesByStatus'

const IssueActions = () => {
  return (
    <Flex  mb="5" justify="between">
      <Flex gap="3">
      <IssueStatusFilter />
      <FilterByUsers/>
      </Flex>
    
      <Button>
        <Link href= "/issues/new"> New Issue </Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
