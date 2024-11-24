import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueStatusBadge from '../components/IssueStatusBadge';
import Link from '../components/Link';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import PaginationPage from '../components/PaginationPage';
import { Metadata } from 'next';

const columns: { label: string; value: keyof Issue; className?: string; sortable?: boolean }[] = [
  { label: 'Issue', value: 'title', sortable: true },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell', sortable: true },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

const IssuesPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ params: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const resolvedSearchParams = await searchParams;

  // Extract `status` from `searchParams`
  const status = Object.values(Status).includes(resolvedSearchParams.status as Status)
    ? (resolvedSearchParams.status as Status)
    : undefined;

  const isValidOrderBy = (field: string | undefined): field is keyof Issue =>
    !!field && columns.some((column) => column.value === field);
  
  const orderBy = isValidOrderBy(resolvedSearchParams.orderBy)
    ? { [resolvedSearchParams.orderBy]: 'asc' }
    : undefined;
  
  const assignedToUserId = resolvedSearchParams.id ? resolvedSearchParams.id : undefined;
  const page = parseInt(resolvedSearchParams.page!) || 1
  const pageSize = 10
  // Fetch issues with optional filtering and sorting
  const issues = await prisma.issue.findMany({
    where: {
      status,
      assignedToUserId, // Filter by assignedToUserID
    },
    orderBy,
    skip: (page-1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({where: { status , assignedToUserId}})
  
  return (
    <div >
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                
                  <NextLink
                    href={{
                      pathname: '/issues',
                      query: { ...resolvedSearchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </NextLink>
               
                {resolvedSearchParams.orderBy === column.value && <ArrowUpIcon className="inline" />}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
              <Link href={`/issues?id=${issue.id}`}>{issue.title}</Link>

              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className='py-5'>
      <PaginationPage pageSize={pageSize}
      currentPage={page}
      itemCount={issueCount}/>
      </div>
     
    </div>
  );
};


export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};

export const revalidate = 0;
export default IssuesPage;
