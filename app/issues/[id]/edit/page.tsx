import React from 'react'
import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>;  // Adjusted to match the expected type
  searchParams: Promise<{ [key: string]: string }>;
}

const EditIssuePage = async ({
  params,
  searchParams,
}: Props) => {
  const resolvedSearchParams = await params;
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
