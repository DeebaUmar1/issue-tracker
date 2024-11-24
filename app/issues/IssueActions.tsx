import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import FilterIssuesByStatus from './FilterIssuesByStatus'
import FilterByUsers from './FilterByUsers'

const IssueActions = () => {
  return (
    <Flex  mb="5" justify="between">
      <Flex gap="3">
      <FilterIssuesByStatus/>
      <FilterByUsers/>
      </Flex>
    
      <Button>
        <Link href= "/issues/new"> New Issue </Link>
      </Button>
    </Flex>
  )
}

export default IssueActions
