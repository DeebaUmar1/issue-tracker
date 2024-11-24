'use client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const statuses: { label: string, value: string }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status && status !== 'ALL') params.append('status', status);
        if (searchParams.get('id')) params.append('id', searchParams.get('id')!);
        if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!);

        const query = params.size ? '?' + params.toString() : '';
        router.push(`/issues` + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};



const IssueStatusFilter =  () => {
  return (
<Suspense>
  <IssueStatus/>
  </Suspense>
  )
  
}


export default IssueStatusFilter;