'use client'
import {QueryClient, QueryClientProvider as RQueryClientProvider} from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

const query = new QueryClient()

const QueryClientProvider = ({children}: PropsWithChildren) => {
  return (
    <RQueryClientProvider client={query}>
        {children}
    </RQueryClientProvider>
  )
}

export default QueryClientProvider
