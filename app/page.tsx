import LatestIssues from './LatestIssues';
import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import IssueChart from './IssueChart';
import { Grid, Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

export default async function Home() {
  // Fetch data in parallel using Promise.all
  const [open, inProgress, closed] = await Promise.all([
    prisma.issue.count({ where: { status: 'OPEN' } }),
    prisma.issue.count({ where: { status: 'IN_PROGRESS' } }),
    prisma.issue.count({ where: { status: 'CLOSED' } }),
  ]);

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
};