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
  params: { id: string };
}

const fetchIssue = async (issueId: string) => {
  return await prisma.issue.findUnique({
    where: { id: parseInt(issueId) }
  });
};

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);
  
  // Fetch issue by ID from URL params
  const issue = await fetchIssue(params.id);

  if (!issue) notFound(); // If no issue found, return 404

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditButton id={issue.id} />
            <DeleteButton id={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await fetchIssue(params.id);

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  };
}

export default IssueDetailPage;