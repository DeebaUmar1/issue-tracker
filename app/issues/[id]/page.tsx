import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/app/auth/AuthOptions'
import AssigneeSelect from './AssigneeSelect'


const IssueDetailPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ [key: string]: string }>;
} ) => {
    const session = await getServerSession(AuthOptions)
    const resolvedSearchParams = await searchParams;
    const issue = await prisma.issue.findUnique(
        {where :{id : parseInt(resolvedSearchParams.id)}}
    )
    if(!issue)
        notFound();
  return (
    <Grid columns = {{ initial : "1", md : "5"}} gap= "5">
      <Box className='md:col-span-4'>
     <IssueDetails issue={issue}/>
      </Box>
      <Box>
      {session &&<Flex direction="column" gap="4">
       <AssigneeSelect issue = {issue}/>
       <EditButton id ={issue.id}/>
       <DeleteButton id = {issue.id}/>
       </Flex> 
       }
        
       
      </Box>
      
       
      
    </Grid>
  )
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ [key: string]: string }>;
} ) {
  const resolvedSearchParams = await searchParams;
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(resolvedSearchParams.id) }});
  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailPage
