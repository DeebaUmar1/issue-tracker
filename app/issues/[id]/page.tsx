import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'
import { getServerSession } from 'next-auth'
import { AuthOptions } from '@/app/auth/AuthOptions'
import AssigneeSelect from './AssigneeSelect'

interface Props {
  params: Promise<{ id: string }>;  // Adjusted to match the expected type
  searchParams: Promise<{ [key: string]: string }>;
}

const fetchIssue = async (issueId: string) => {
  return await prisma.issue.findUnique({
    where: { id: parseInt(issueId) }
  });
};

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);
  
  // Await the params to get the actual value
  const resolvedParams = await params;
  console.log(resolvedParams)
  console.log(resolvedParams.id)
  // Fetch the issue using the ID from the resolved params
  const issue = await fetchIssue(resolvedParams.id);
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


export default IssueDetailPage
