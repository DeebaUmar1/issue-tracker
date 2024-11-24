import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import IssueDetails from './IssueDetails';
import { getServerSession } from 'next-auth';
import { AuthOptions } from '@/app/auth/AuthOptions';
import AssigneeSelect from './AssigneeSelect';

const IssueDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { id?: string };
}) => {
  const session = await getServerSession(AuthOptions);

  // Extract and validate the `id`
  const id = searchParams.id ? parseInt(searchParams.id) : NaN;
  if (isNaN(id)) {
    notFound(); // Redirect to 404 if `id` is invalid
  }

  // Fetch the issue
  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    notFound(); // Redirect to 404 if issue is not found
  }

  return (
    <Grid columns={{ initial: '1', md: '5' }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditButton id={issue.id} />
            <DeleteButton id={issue.id} />
          </Flex>
        )}
      </Box>
    </Grid>
  );
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { id?: string };
}) {
  const id = searchParams.id ? parseInt(searchParams.id) : NaN;
  if (isNaN(id)) {
    return {
      title: 'Issue Not Found',
      description: 'The issue you are looking for does not exist.',
    };
  }

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    return {
      title: 'Issue Not Found',
      description: 'The issue you are looking for does not exist.',
    };
  }

  return {
    title: issue.title,
    description: `Details of issue ${issue.id}`,
  };
}

export default IssueDetailPage;
