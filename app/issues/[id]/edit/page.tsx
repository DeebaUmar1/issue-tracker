import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'


const EditIssuePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ [key: string]: string }>;
} ) => {
  const resolvedSearchParams = await searchParams;
    const issue = await prisma.issue.findUnique({
        where : { id: parseInt(resolvedSearchParams.id)}
    })
    if(!issue)
        notFound;
  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage
